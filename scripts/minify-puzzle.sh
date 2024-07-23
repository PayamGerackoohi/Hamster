set -e
path=`dirname $0`
cd ${path}/../puzzle
minify() {
  html-minifier -o ../artifacts/$1 $1 \
  --collapse-whitespace \
  --remove-comments \
  --minify-css \
  --minify-js
}
if [ -f "$1" ]; then
  minify $1
elif [ -f "$1.html" ]; then
  minify $1.html
else
  echo "File \"$1\" does not exist"
fi
