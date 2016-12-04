#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo root is $DIR
rsync -a $DIR/client/outscripts/sbsbundle.js.min.js $DIR/cordova/www/scripts/sbsbundle.min.js
rsync -a $DIR/client/outscripts/sbsbundle.js $DIR/cordova/www/scripts/sbsbundle.js
rsync -a $DIR/client/content/sbsbundle.css.min.css $DIR/cordova/www/css/sbsbundle.min.css
rsync -a $DIR/client/content/sbsbundle.css $DIR/cordova/www/css/sbsbundle.css
rsync -a $DIR/client/content/fonts/ $DIR/cordova/www/fonts

for i in $( find $DIR/client/content/v1 -type f ); do
           rsync -a $i $DIR/cordova/www/images
done