@echo off
echo ===================================================
echo   ToolCraftKit - Deploy to Vercel
echo ===================================================
echo.

cd /d J:\TOOLKRAFKIT\toolcraftkit

set /p MSG="Commit message: "

echo.
echo Adding all changes...
git add -A

echo.
echo Committing...
git commit -m "%MSG%"

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
