set -e
path=`dirname $0`
cd ${path}
. minify.sh
cd ..

pushd src/cipher > /dev/null
node cipher.js
popd > /dev/null

minify pages/cipher.html src/cipher/cipher.html
minify pages/js/cipher/data.js src/cipher/js/cipher/data.js
minify pages/js/cipher/content.js src/cipher/js/cipher/content.js
