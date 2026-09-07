/**
 * Fix TypeScript errors in Stripe integration
 * Run: node fix-stripe-ts.js
 * Then: git add . && git commit -m "fix: TypeScript errors in Stripe integration" && git push
 */

const fs = require('fs');
const path = require('path');

// Fix 1: src/lib/stripe.ts — wrong API version
const stripePath = path.join('src', 'lib', 'stripe.ts');
fs.writeFileSync(stripePath, `import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-18.acacia' as any,
  typescript: true,
});
`, 'utf-8');
console.log('✅ Fixed src/lib/stripe.ts (apiVersion)');

// Fix 2: src/app/api/webhook/route.ts — TypeScript property errors
const webhookPath = path.join('src', 'app', 'api', 'webhook', 'route.ts');
fs.writeFileSync(webhookPath, `import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createServiceClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      const userId = session.metadata?.supabase_user_id;
      if (!userId) break;

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string) as any;
      const priceId = subscription.items.data[0].price.id;
      const plan = priceId === 'price_1UDAZ35cQm71aMnsolHy0jZI' ? 'monthly' : 'annual';

      await supabase.from('profiles').update({
        subscription_status: 'active',
        subscription_plan: plan,
        subscription_id: subscription.id,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        stripe_customer_id: session.customer as string,
      }).eq('id', userId);
      break;
    }

    case 'invoice.paid': {
      const invoice = event.data.object as any;
      const customerId = invoice.customer as string;

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (profile && invoice.subscription) {
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string) as any;
        await supabase.from('profiles').update({
          subscription_status: 'active',
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        }).eq('id', profile.id);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as any;
      const customerId = subscription.customer as string;

      await supabase.from('profiles').update({
        subscription_status: 'free',
        subscription_plan: null,
        subscription_id: null,
        current_period_end: null,
      }).eq('stripe_customer_id', customerId);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as any;
      const customerId = invoice.customer as string;

      await supabase.from('profiles').update({
        subscription_status: 'past_due',
      }).eq('stripe_customer_id', customerId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
`, 'utf-8');
console.log('✅ Fixed src/app/api/webhook/route.ts (TypeScript types)');

console.log('\\n🎉 All fixes applied! Now run:');
console.log('git add . && git commit -m "fix: TypeScript errors in Stripe integration" && git push');
