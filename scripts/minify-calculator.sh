set -e
path=`dirname $0`
cd ${path}
. minify.sh
cd ..

minify pages/calculator.html src/calculator/calculator.html
