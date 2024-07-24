set -e
path=`dirname $0`
cd ${path}
. minify.sh
cd ..

dst=pages/$1
src=src/puzzle/$1

if [ -f "${src}" ]; then
  minify ${dst} ${src}
elif [ -f "${src}.html" ]; then
  minify ${dst}.html ${src}.html
else
  echo "File \"$1\" does not exist"
fi
