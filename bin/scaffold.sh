#!/bin/bash
echo -n "project slug: (new) " && read SLUG
echo -n "project title: (New Map) " && read TITLE
echo -n "project description: (A new map.) " && read DESCRIPTION

if [[ $SLUG == '' ]]; then
  SLUG=new
fi

if [[ $TITLE == '' ]]; then
  TITLE='New Map'
fi

if [[ $DESCRIPTION == '' ]]; then
  DESCRIPTION='A new map.'
fi
cp -i ./render-sample.js ./src/render-$SLUG.js
cat ./src/render-$SLUG.js | sed -e "s/{{title}}/$TITLE/g" | sed -e "s/{{description}}/$DESCRIPTION/g" > ./src/render-$SLUG.js

echo "\`./src/render-$SLUG.js\` has been generated."
echo "Run \`npm run build\` to generate new page."
echo "`$TITLE` will be accesible at '/dest/$SLUG/index.html'."
