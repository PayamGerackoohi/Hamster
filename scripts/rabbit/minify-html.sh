set -e
path=`dirname $0`
cd ${path}
cd ..
. minify-util
cd ..

html=rabbit.html
cardsData=js/rabbit/cards-data.js
enigmaData=js/rabbit/enigma-data.js
content=js/rabbit/content.js
srcDir=src/rabbit/
pageDir=pages/
minify ${pageDir}${html} ${srcDir}${html}
minify ${pageDir}${cardsData} ${srcDir}${cardsData}
minify ${pageDir}${enigmaData} ${srcDir}${enigmaData}
minify ${pageDir}${content} ${srcDir}${content}
