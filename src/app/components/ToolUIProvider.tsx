"use client";
import { createContext, useContext, useMemo } from "react";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface ToolUITranslations {
  // Existing keys
  upload: string; download: string; convert: string; copy: string; copied: string;
  reset: string; clear: string; generate: string; calculate: string; save: string;
  delete: string; edit: string; preview: string; processing: string; converting: string;
  downloading: string; dragDrop: string; orClickBrowse: string; maxFileSize: string;
  selectFile: string; removeFile: string; signInRequired: string; signInFree: string;
  usageLimit: string; upgradePro: string; freeUsesLeft: string; perDay: string;
  perMonth: string; result: string; success: string; error: string; noResults: string;
  tryAgain: string; aboutThisTool: string; faq: string; inputText: string;
  outputText: string; enterText: string; pasteText: string; fileName: string;
  fileSize: string; format: string; quality: string; width: string; height: string;
  color: string; size: string; scale: string; opacity: string; position: string;
  font: string; home: string; backToTools: string; convertAnother: string; tryAnother: string;
  // New action keys
  remove: string; add: string; start: string; stop: string; pause: string; resume: string;
  apply: string; submit: string; cancel: string; select: string; choose: string; swap: string;
  scan: string; encode: string; decode: string; merge: string; split: string; compress: string;
  resize: string; crop: string; print: string; share: string; refresh: string; randomize: string;
  // Download variants
  downloadPNG: string; downloadPDF: string; downloadJPG: string; downloadAll: string; downloadZIP: string;
  // Navigation
  startOver: string; scanAnother: string; uploadNew: string; addMore: string; newImage: string;
  // Status
  scanning: string; compressing: string; merging: string; resizing: string;
  generating: string; calculating: string; loading: string;
  // Results
  decodedResult: string; openURL: string; livePreview: string; comparison: string;
  original: string; compressed: string; converted: string; difference: string;
  totalSaved: string; outputFormat: string;
  // Upload variants
  dropImageHere: string; dropFileHere: string; dropPDFHere: string; dropImagesHere: string;
  supportedFormats: string; clickOrDrag: string;
  // Form labels
  name: string; email: string; phone: string; address: string; website: string;
  date: string; dueDate: string; notes: string; description: string; title: string;
  optional: string; required: string;
  // Numbers & Math
  amount: string; total: string; subtotal: string; tax: string; discount: string;
  price: string; quantity: string; value: string; count: string; length: string;
  percentage: string; minimum: string; maximum: string; average: string; range: string;
  // Currency & Finance
  currency: string; interestRate: string; loanAmount: string; monthlyPayment: string;
  totalInterest: string; totalPaid: string; annualSalary: string; hourlyRate: string;
  balance: string; principal: string; interest: string; payment: string; investment: string;
  returnValue: string; savings: string; profit: string; revenue: string;
  initialInvestment: string; finalValue: string; amountSaved: string;
  youPay: string; youSave: string; originalPrice: string; finalPrice: string;
  // Time
  years: string; months: string; days: string; hours: string; minutes: string; seconds: string;
  year: string; month: string; day: string;
  weekly: string; monthly: string; annually: string; daily: string;
  // People & Body
  male: string; female: string; age: string; imperial: string; metric: string;
  heightLabel: string; weightLabel: string; neck: string; waist: string; hip: string;
  bodyFatPercentage: string; fatMass: string; leanMass: string; bmi: string; calories: string;
  // Text
  words: string; characters: string; sentences: string; paragraphs: string;
  readingTime: string; speakingTime: string; keywordDensity: string;
  // Invoice/Resume
  pageTitle: string; items: string; invoiceNumber: string; billTo: string;
  fromDetails: string; printSavePDF: string; education: string; experience: string;
  skills: string; personalInfo: string; fullName: string; professionalSummary: string;
  workExperience: string;
  // Timer
  workMin: string; breakMin: string; lap: string; splitTime: string; totalTime: string;
  // Colors
  baseColor: string; textColor: string; backgroundColor: string; shades: string; tints: string;
  // Password
  password: string; generatePasswords: string;
  // Image dimensions
  widthPx: string; heightPx: string; newDimensions: string; quickPresets: string;
  aspectRatio: string; bestQuality: string; smallestFile: string;
  // Age/Date
  dateOfBirth: string; yourAge: string; untilNextBirthday: string; bornOn: string;
  // Misc
  copyHTML: string; from: string; to: string; steps: string;
  addItem: string; addStep: string; people: string; each: string;
}

const defaultToolUI: ToolUITranslations = {
  // Existing
  upload: "Upload", download: "Download", convert: "Convert", copy: "Copy", copied: "Copied!",
  reset: "Reset", clear: "Clear", generate: "Generate", calculate: "Calculate", save: "Save",
  delete: "Delete", edit: "Edit", preview: "Preview", processing: "Processing...",
  converting: "Converting...", downloading: "Downloading...",
  dragDrop: "Drag & drop your file here", orClickBrowse: "or click to browse your files",
  maxFileSize: "Maximum file size", selectFile: "Select a file", removeFile: "Remove file",
  signInRequired: "Please sign in to use this tool.",
  signInFree: "Create a free account to get started.",
  usageLimit: "Usage limit reached", upgradePro: "Upgrade to Pro for unlimited access",
  freeUsesLeft: "free uses left", perDay: "per day", perMonth: "per month",
  result: "Result", success: "Success!", error: "Error", noResults: "No results",
  tryAgain: "Try again", aboutThisTool: "About This Tool", faq: "Frequently Asked Questions",
  inputText: "Input Text", outputText: "Output Text", enterText: "Enter your text here...",
  pasteText: "Paste your text here...", fileName: "File name", fileSize: "File size",
  format: "Format", quality: "Quality", width: "Width", height: "Height", color: "Color",
  size: "Size", scale: "Scale", opacity: "Opacity", position: "Position", font: "Font",
  home: "Home", backToTools: "Back to Tools", convertAnother: "Convert Another", tryAnother: "Try Another",
  // New actions
  remove: "Remove", add: "Add", start: "Start", stop: "Stop", pause: "Pause", resume: "Resume",
  apply: "Apply", submit: "Submit", cancel: "Cancel", select: "Select", choose: "Choose", swap: "Swap",
  scan: "Scan", encode: "Encode", decode: "Decode", merge: "Merge", split: "Split",
  compress: "Compress", resize: "Resize", crop: "Crop", print: "Print", share: "Share",
  refresh: "Refresh", randomize: "Randomize",
  // Download variants
  downloadPNG: "Download PNG", downloadPDF: "Download PDF", downloadJPG: "Download JPG",
  downloadAll: "Download All", downloadZIP: "Download ZIP",
  // Navigation
  startOver: "Start Over", scanAnother: "Scan Another", uploadNew: "Upload New Image",
  addMore: "Add More", newImage: "New Image",
  // Status
  scanning: "Scanning...", compressing: "Compressing...", merging: "Merging...",
  resizing: "Resizing...", generating: "Generating...", calculating: "Calculating...",
  loading: "Loading...",
  // Results
  decodedResult: "Decoded Result", openURL: "Open URL", livePreview: "Live Preview",
  comparison: "Comparison", original: "Original", compressed: "Compressed",
  converted: "Converted", difference: "Difference", totalSaved: "Total Saved",
  outputFormat: "Output Format",
  // Upload variants
  dropImageHere: "Drop an image here or click to upload",
  dropFileHere: "Drop a file here or click to upload",
  dropPDFHere: "Drop PDF files here or click to upload",
  dropImagesHere: "Drop images here or click to upload",
  supportedFormats: "Supported formats", clickOrDrag: "Click or drag an image here",
  // Form labels
  name: "Name", email: "Email", phone: "Phone", address: "Address", website: "Website",
  date: "Date", dueDate: "Due Date", notes: "Notes", description: "Description", title: "Title",
  optional: "(optional)", required: "Required",
  // Numbers & Math
  amount: "Amount", total: "Total", subtotal: "Subtotal", tax: "Tax", discount: "Discount",
  price: "Price", quantity: "Qty", value: "Value", count: "Count", length: "Length",
  percentage: "Percentage", minimum: "Min", maximum: "Max", average: "Average", range: "Range",
  // Currency & Finance
  currency: "Currency", interestRate: "Interest Rate", loanAmount: "Loan Amount",
  monthlyPayment: "Monthly Payment", totalInterest: "Total Interest", totalPaid: "Total Paid",
  annualSalary: "Annual Salary", hourlyRate: "Hourly Rate", balance: "Balance",
  principal: "Principal", interest: "Interest", payment: "Payment", investment: "Investment",
  returnValue: "Return", savings: "Savings", profit: "Profit", revenue: "Revenue",
  initialInvestment: "Initial Investment", finalValue: "Final Value",
  amountSaved: "Amount Saved", youPay: "You Pay", youSave: "You Save",
  originalPrice: "Original Price", finalPrice: "Final Price",
  // Time
  years: "years", months: "months", days: "days", hours: "hours", minutes: "minutes", seconds: "seconds",
  year: "Year", month: "Month", day: "Day",
  weekly: "Weekly", monthly: "Monthly", annually: "Annually", daily: "Daily",
  // People & Body
  male: "Male", female: "Female", age: "Age", imperial: "Imperial", metric: "Metric",
  heightLabel: "Height", weightLabel: "Weight", neck: "Neck", waist: "Waist", hip: "Hip",
  bodyFatPercentage: "Body Fat Percentage", fatMass: "Fat Mass", leanMass: "Lean Mass",
  bmi: "BMI", calories: "Calories",
  // Text
  words: "Words", characters: "Characters", sentences: "Sentences", paragraphs: "Paragraphs",
  readingTime: "Reading Time", speakingTime: "Speaking Time", keywordDensity: "Keyword Density",
  // Invoice/Resume
  pageTitle: "Page Title", items: "Items", invoiceNumber: "Invoice #", billTo: "Bill To",
  fromDetails: "From (Your Details)", printSavePDF: "Print / Save as PDF",
  education: "Education", experience: "Experience", skills: "Skills",
  personalInfo: "Personal Information", fullName: "Full Name",
  professionalSummary: "Professional Summary", workExperience: "Work Experience",
  // Timer
  workMin: "Work (min)", breakMin: "Break (min)", lap: "Lap", splitTime: "Split Time", totalTime: "Total Time",
  // Colors
  baseColor: "Base Color", textColor: "Text Color", backgroundColor: "Background Color",
  shades: "Shades (darker)", tints: "Tints (lighter)",
  // Password
  password: "Password", generatePasswords: "Generate Passwords",
  // Image dimensions
  widthPx: "Width (px)", heightPx: "Height (px)", newDimensions: "New Dimensions",
  quickPresets: "Quick Presets", aspectRatio: "Aspect Ratio", bestQuality: "Best quality",
  smallestFile: "Smallest file",
  // Age/Date
  dateOfBirth: "Date of Birth", yourAge: "Your Age",
  untilNextBirthday: "Until next birthday", bornOn: "Born on",
  // Misc
  copyHTML: "Copy HTML", from: "From", to: "To", steps: "Steps",
  addItem: "+ Add Item", addStep: "+ Add Step", people: "people", each: "each",
};

const ToolUIContext = createContext<ToolUITranslations>(defaultToolUI);

const TOOL_UI_KEYS = Object.keys(defaultToolUI) as (keyof ToolUITranslations)[];

export function ToolUIProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  const toolUI = useMemo(() => {
    const translations = {} as ToolUITranslations;
    for (const key of TOOL_UI_KEYS) {
      const val = t(`toolUI.${key}`);
      translations[key] = val !== `toolUI.${key}` ? val : defaultToolUI[key];
    }
    return translations;
  }, [t]);

  return (
    <ToolUIContext.Provider value={toolUI}>{children}</ToolUIContext.Provider>
  );
}

export function useToolUI(): ToolUITranslations {
  return useContext(ToolUIContext);
}
