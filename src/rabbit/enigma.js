const { makeTempDir, downlaod, extractFromFile, StringDigester } = require('../util/util')
const fs = require('fs')

const tempDir = 'temp-enigma/'
makeTempDir(tempDir)

downlaod({
  link: 'https://mahapolicerc.mahaitexam.in/rocky-rabbit-enigma/',
  output: `${tempDir}original.html`
}).then(file => extract(file))
  .catch(err => console.log(err))

function extract(input) {
  return phase1(input)
    .then(file => phase2(file))

  function phase1(input) {
    return extractFromFile({
      input,
      output: `${tempDir}phase1.html`,
      digester: new StringDigester('<figure', '</figure>'),
    })
  }
  function phase2(input) {
    return new Promise(resolve => {
      const text = fs.readFileSync(input).toString()
      const rgx = /^.*(<img.*\/>).*$/
      const data = rgx.exec(text)[1]
      fs.writeFileSync('js/rabbit/enigma-data.js', `const enigmaData = '${data}'`)
      resolve()
    })
  }
}
