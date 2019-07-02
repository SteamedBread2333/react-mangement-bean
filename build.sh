rm -rf dist
npm run build
cd ./dist
ls -a
echo "window.webConfig={baseUrl: '$1'}" >> config.js
cat ./config.js