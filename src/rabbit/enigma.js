const { makeTempDir, downlaod, extractFromFile, StringDigester } = require('../util/util')
const fs = require('fs')

const tempDir = 'temp-enigma/'
const MAX_PAGE = 10
let page = 1

makeTempDir(tempDir)
downloadEnigma()

function downloadEnigma() {
  const link = `https://nobitex.ir/mag/category/news/game/${page > 1 ? `page/${page}/` : ''}`
  console.log(`downloadEnigma: ${link}`)
  return downlaod({
    link,
    output: `${tempDir}original-${page}.html`
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
    return extractFromFile({
      input,
      output: `${tempDir}phase1-${page}.html`,
      digester: new StringDigester('<a href="https://nobitex.ir/mag/news-rocky-rabbit-enigma-', '">')
    })
  }
  function phase2(file) {
    return new Promise((resolve, reject) => {
      const link = fs.readFileSync(file).toString().replace('">', '')
      if (link)
        resolve(`https://nobitex.ir/mag/news-rocky-rabbit-enigma-${link}`)
      else {
        page += 1
        if (page < MAX_PAGE)
          downloadEnigma()
        else
          reject(`MAX_PAGE reached: ${MAX_PAGE}`)
      }
    })
  }
  function phase3(link) {
    return downlaod({
      link,
      output: `${tempDir}phase3.html`,
    })
  }
  function phase4(input) {
    return extractFromFile({
      input,
      output: `${tempDir}phase4.html`,
      digester: new StringDigester('<figure class="aligncenter', '</figure>')
    })
  }
  function phase5(input) {
    return new Promise(resolve => {
      const regex = /data-lazy-src="(?<sublink>.*?)"/
      const { sublink } = fs.readFileSync(input).toString().match(regex)?.groups || {}
      const data = { link: `https://nobitex.ir/mag/${sublink}` }
      fs.writeFileSync(
        `js/rabbit/enigma-data.js`,
        `const enigmaData = ${JSON.stringify(data, null, 2)}`
      )
      resolve()
    })
  }
}
