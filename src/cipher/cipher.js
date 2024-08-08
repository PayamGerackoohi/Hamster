const morse = require('../util/morse')
const { makeTempDir, downlaod, extractFromFile, StringDigester } = require('../util/util')
const fs = require('fs')

let page = 1

makeTempDir()
downloadCipher()

function downloadCipher() {
  const link = `https://nobitex.ir/mag/category/news/game/${page > 1 ? `page/${page}` : ''}`
  console.log(`DownloadCipher: page: ${page}`)
  downlaod({
    link,
    output: `temp/original-${page}.html`,
  }).then(file => extract(file))
    .catch(err => console.log(err))
}

function extract(input) {
  return phase1(input)
    .then(file => phase2(file))
    .then(link => phase3(link))
    .then(file => phase4(file))
    .then(file => phase5(file))

  function phase1(input) {
    return extractFromFile(
      {
        input,
        output: `temp/phase1-${page}.html`,
        digester: new StringDigester('<a href="https://nobitex.ir/mag/news-hamster-kombat-morse-code-', '">'),
      }
    )
  }
  function phase2(input) {
    return new Promise(resolve => {
      const text = fs.readFileSync(input).toString().replace('">', '')
      if (text)
        resolve(`https://nobitex.ir/mag/news-hamster-kombat-morse-code-${text}`)
      else {
        page += 1
        return downloadCipher()
      }
      // const regex = /<strong>[ <br>]*(?<code>.*?)[ <br>]*<\/strong>/
      //   const regex = /<strong>[ <br>]*(?<code>.*?)[ <br>]*<\/strong>/
      //   const { code } = regex.exec(text)?.groups || {}
      //   const data = code.split('').map(c => ({ c, m: morse[c.toLowerCase()] }))
      //   fs.writeFileSync('js/cipher/data.js', `const data = ${JSON.stringify(data)}`)
    })
  }
  function phase3(link) {
    return downlaod({
      link,
      output: 'temp/phase3.html',
    })
  }
  function phase4(input) {
    return extractFromFile({
      input,
      output: 'temp/phase4.html',
      digester: new StringDigester('<pre class="wp-block-code"><code>', '</code>'),
    })
  }
  function phase5(file) {
    const text = fs.readFileSync(file).toString().replace('</code>', '')
    const regex = /(\w).*?/g
    const data = text.match(regex).map(c => ({ c, m: morse[c.toLowerCase()] }))
    fs.writeFileSync('js/cipher/data.js', `const data = ${JSON.stringify(data)}`)
  }
}
