set -e
path=`dirname $0`
cd ${path}
. minify.sh
cd ..

pushd src/combo > /dev/null
node combo.js
popd > /dev/null

minify pages/combo.html src/combo/combo.html
minify pages/js/combo/data.js src/combo/js/combo/data.js
minify pages/js/combo/content.js src/combo/js/combo/content.js
