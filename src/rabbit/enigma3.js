const fs = require('fs')
const { makeTempDir, downlaod, extractFromFile, StringDigester } = require('../util/util')

tempDir = 'temp-enigma/'
makeTempDir(tempDir)

downlaod({
  link: 'https://hindijankaripur.com/rockyrabbit-wallet-passphrase-order/',
  output: `${tempDir}original.html`
}).then(file => extract(file))

function extract(file) {
  return phase1(file)
    .then(file => phase2(file))

  function phase1(input) {
    return extractFromFile({
      input,
      output: `${tempDir}phase1.html`,
      digester: new StringDigester('<h2 class="wp-block-heading">', '</figure>'),
    })
  }
  function phase2(input) {
    return new Promise(resolve => {
      const text = fs.readFileSync(input).toString()
      const regex = /srcset="(?<sources>.*?)"/
      const { sources } = regex.exec(text).groups
      const data = sources.split(',')
        .map(it => it.trim().split(' '))
        .map(it => ({ link: it[0], resolution: +it[1].replace('w', '') }))
        .sort((a, b) => a.resolution - b.resolution)
        .filter(it => it.resolution > 300)[0]
      fs.writeFileSync(`js/rabbit/enigma-data.js`, `const enigmaData = ${JSON.stringify(data, null, 2)}`)
      resolve()
    })
  }
}
