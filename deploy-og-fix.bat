@echo off
echo ===================================================
echo   ToolCraftKit - Deploy OG Tags Fix
echo ===================================================
echo.

cd /d J:\TOOLKRAFKIT\toolcraftkit

echo Adding all changes...
git add -A

echo.
echo Committing...
git commit -m "fix: unique OG tags + metadata for all tool pages - SEO/AdSense fix"

echo.
echo Pushing to GitHub (triggers Vercel auto-deploy)...
git push origin main

echo.
echo ===================================================
echo   Done! Vercel will auto-deploy in ~2 minutes.
echo   Check: https://vercel.com/dashboard
echo ===================================================
echo.
pause
