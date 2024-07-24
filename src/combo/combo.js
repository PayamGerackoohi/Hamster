const { makeTempDir, downlaod, extractFromFile, StringDigester } = require('../util/util')
const fs = require('fs')

makeTempDir()
downlaod({
  link: 'https://www.cyberkendra.com/p/hamster-kombat-daily-combo-cards.html',
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
        digester: new StringDigester('<div class="spoiler_content show">', '</div></div>'),
      }
    )
  }
  function phase2(input) {
    return extractFromFile(
      {
        input,
        output: 'temp/phase2.html',
        digester: new StringDigester('<ul style="text-align: left;">', '</ul>'),
      }
    )
  }
  function phase3(input) {
    const dataRegex = /^(.+) \((.+)\)$/
    return new Promise(resolve => {
      const data = fs.readFileSync(input)
        .toString()
        .replace(/<li>|<b>|<\/b>|<\/ul>/g, '')
        .split('</li>')
        .map(it => dataRegex.exec(it))
        .filter(it => it)
        .map(it => ({ group: it[2], card: it[1] }))
      fs.writeFileSync('js/combo/data.js', `const data = ${JSON.stringify(data)}`)
      resolve()
    })
  }
}
