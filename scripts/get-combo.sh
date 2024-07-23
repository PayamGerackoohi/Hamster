set -e
path=`dirname $0`
cd ${path}/../parse/combo
node combo.js
file=combo.html
output=../../artifacts/${file}
html-minifier -o ${output} ${file} \
--collapse-whitespace \
--remove-comments \
--minify-css \
--minify-js
open ${output}
