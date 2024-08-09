const { makeTempDir, downlaod, extractFromFile, StringDigester } = require('../util/util')
const fs = require('fs')

const MAX_PAGE = 10
let page = 1

makeTempDir()
downloadCards()

function downloadCards() {
  const link = `https://nobitex.ir/mag/category/news/game/${page > 1 ? `page/${page}/` : ''}`
  console.log(`downloadCards: ${page}`)
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
        digester: new StringDigester('<a href="https://nobitex.ir/mag/news-hamster-kombat-cards-', '">'),
      }
    )
  }
  function phase2(input) {
    return new Promise((resolve, reject) => {
      const subLink = fs.readFileSync(input).toString().replace('">', '')
      if (subLink) {
        const link = `https://nobitex.ir/mag/news-hamster-kombat-cards-${subLink}`
        fs.writeFileSync(`temp/phase2-${page}.html`, link)
        resolve(link)
      } else {
        page += 1
        if (page < MAX_PAGE)
          return downloadCards()
        else
          reject(`MAX_PAGE reached: ${MAX_PAGE}`)
      }
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
      digester: new StringDigester('<figure class="wp-block-image size-full">', '</ul>')
    })
  }
  function phase5(input) {
    const text = fs.readFileSync(input).toString()
    const imageRegex = /data-lazy-src="(?<image>.*?)"/
    const descriptionRegex = /(?<description><ul>.*?<\/ul>)/s
    const { image } = text.match(imageRegex)?.groups || {}
    const { description } = text.match(descriptionRegex)?.groups || {}
    const data = {
      image: `https://nobitex.ir/mag/${image}`,
      description
    }
    fs.writeFileSync('js/combo/data.js', `const data = ${JSON.stringify(data, null, 2)}`)
  }
}
