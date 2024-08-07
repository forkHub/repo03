set BB_DEST_DIR=D:\xampp4\htdocs\io\bblok

7z a -tzip bblok ./build/*
xcopy bblok.7z "G:\My Drive\blockly"
xcopy .\build\* %BB_DEST_DIR% /i /s /y

pause
pause
