set -e
path=`dirname $0`
cd ${path}/../calculator
file=hamster-calculator.html
html-minifier -o ../artifacts/${file} ${file} \
--collapse-whitespace \
--remove-comments \
--minify-css \
--minify-js
