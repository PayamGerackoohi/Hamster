set -e
path=`dirname $0`
cd ${path}/../../src/rabbit
./cards.sh
./enigma.sh
./minify-html.sh
