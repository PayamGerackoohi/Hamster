const { makeTempDir, downlaod, extractFromFile, StringDigester } = require('../util/util')
const fs = require('fs')

const makeCardData = ({ img, ul }) => `const cardData = {
  img: '${img}',
  ul: '${ul}',
}`

const tempDir = 'temp-cards/'
makeTempDir(tempDir)

downlaod({
  link: 'https://imdweather.com/tap2earn/',
  output: `${tempDir}original.html`,
}).then(file => extract(file))
  .catch(err => console.log(err))

function extract(input) {
  const sublink = 'https://imdweather.com/tap2earn/rocky-rabbit-daily-combo-'
  return phase1(input)
    .then(file => phase2(file))
    .then(link => phase3(link))
    .then(file => phase4(file))
    .then(file => phase5(file))

  function phase1(input) {
    return extractFromFile({
      input,
      output: `${tempDir}phase1.html`,
      digester: new StringDigester(`href="${sublink}`, '"')
    })
  }
  function phase2(input) {
    return new Promise(resolve => {
      const text = fs.readFileSync(input).toString()
      const rgx = /^(.*)[\/]*"$/
      const data = rgx.exec(text)[1]
      const fullLink = `${sublink}${data}`
      fs.writeFileSync(`${tempDir}phase2.txt`, fullLink)
      resolve(fullLink)
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
      digester: new StringDigester('<h2><strong>Rocky Rabbit Daily Combo', '</ul>')
    })
  }
  function phase5(file) {
    return new Promise(resolve => {
      const text = fs.readFileSync(file).toString()
      const rgx = /^.*data-src="(?<img>.*?)" .*(?<ul><ul>.*<\/ul>).*$/
      fs.writeFileSync(
        'js/rabbit/cards-data.js',
        makeCardData(rgx.exec(text).groups)
      )
      resolve()
    })
  }
}
