const { makeTempDir, downlaod, extractFromFile, StringDigester } = require('../util/util')
const fs = require('fs')

const tempDir = 'temp-cards/'
makeTempDir(tempDir)
let page = 0

downloadCards()

function downloadCards() {
  downlaod({
    link: `https://nobitex.ir/mag/category/news/game/${page ? `page/${page}` : ''}`,
    output: `${tempDir}original-${page}.html`,
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
      digester: new StringDigester('a href="https://nobitex.ir/mag/news-rocky-rabbit-card-', '">'),
    })
  }
  function phase2(input) {
    return new Promise(resolve => {
      const date = fs.readFileSync(input).toString().replace('">', '')
      if (date) {
        const link = `https://nobitex.ir/mag/news-rocky-rabbit-card-${date}`
        resolve(link)
      } else {
        page += 1
        return downloadCards()
      }
    })
  }
  function phase3(link) {
    console.log(link)
    return downlaod({
      link,
      output: `${tempDir}phase3.html`
    })
  }
  function phase4(input) {
    return extractFromFile({
      input,
      output: `${tempDir}phase4.html`,
      digester: new StringDigester('<div class="wp-block-image"', '</ul>')
    })
  }
  function phase5(file) {
    return new Promise(resolve => {
      const sublinkRegex = /data-lazy-src="(?<sublink>.*?)"/
      const descriptionRegex = /(?<description><ul>.*?<\/ul>)/s
      const text = fs.readFileSync(file).toString()
      const { sublink } = text.match(sublinkRegex).groups
      const { description } = text.match(descriptionRegex).groups
      const data = {
        img: `https://nobitex.ir/mag/${sublink}`,
        description,
      }
      fs.writeFileSync(`js/rabbit/cards-data.js`, `const cardData = ${JSON.stringify(data, null, 2)}`)
      resolve()
    })
  }
}
