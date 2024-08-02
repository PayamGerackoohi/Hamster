const morse = require('../util/morse')
const { makeTempDir, downlaod, extractFromFile, StringDigester } = require('../util/util')
const fs = require('fs')

makeTempDir()
downlaod({
  link: 'https://giveawaylisting.com/hamster-kombat/daily-cipher-code/',
  output: 'temp/original.html'
}).then(file => extract(file))
  .catch(err => console.log(err))

function extract(input) {
  return phase1(input)
    .then(file => phase2(file))

  function phase1(input) {
    return extractFromFile(
      {
        input,
        output: 'temp/phase1.html',
        digester: new StringDigester('Here is the', '</strong>'),
      }
    )
  }
  function phase2(input) {
    return new Promise(resolve => {
      const text = fs.readFileSync(input).toString()
      const regex = /<strong>(?<code>.*?)<\/strong>/
      const { code } = regex.exec(text)?.groups || {}
      const data = code.split('').map(c => ({ c, m: morse[c.toLowerCase()] }))
      fs.writeFileSync('js/cipher/data.js', `const data = ${JSON.stringify(data)}`)
      resolve()
    })
  }
}
