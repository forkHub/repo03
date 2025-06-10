call build.bat

echo staging start

xcopy .\dist\index.html .\build
xcopy .\dist\bundle.js .\build

pause
pause