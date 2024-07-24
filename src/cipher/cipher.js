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
    .then(file => phase3(file))

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
    return extractFromFile(
      {
        input,
        output: 'temp/phase2.html',
        digester: new StringDigester('<strong>', '<br>'),
      }
    )
  }
  function phase3(input) {
    const code = fs.readFileSync(input).toString().replace('<br>', '')
    const data = code.split('').map(c => ({ c, m: morse[c.toLowerCase()] }))
    fs.writeFileSync('js/cipher/data.js', `const data = ${JSON.stringify(data)}`)
  }
}
