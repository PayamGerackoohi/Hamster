set -e
path=`dirname $0`
cd ${path}/../parse/cipher
node cipher.js
file=cipher.html
output=../../artifacts/${file}
html-minifier -o ${output} ${file} \
--collapse-whitespace \
--remove-comments \
--minify-css \
--minify-js
open ${output}
