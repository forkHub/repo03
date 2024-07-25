set BB_DEST_DIR=D:\xampp4\htdocs\io\bblok

7z a bblok ./build/*
xcopy bblok.7z "G:\My Drive"
xcopy .\build\* %BB_DEST_DIR% /i /s /y

pause
pause