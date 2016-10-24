xcopy %~dp0\web\Client\Scripts\sbsbundle.min.js %~dp0\cordova\www\scripts\sbsbundle.min.js /F/R/Y
xcopy %~dp0\web\Client\Content\sbsbundle.min.css %~dp0\cordova\www\css\sbsbundle.min.css /F/R/Y

xcopy %~dp0\web\Client\Scripts\sbsbundle.js %~dp0\cordova\www\scripts\sbsbundle.js /F/R/Y
xcopy %~dp0\web\Client\Content\sbsbundle.css %~dp0\cordova\www\css\sbsbundle.css /F/R/Y

for /r %~dp0\web\Client\Content\v1 %%f in (*.*) do @xcopy "%%f" %~dp0\cordova\www\images\ /F/R/Y