const https = require('https')
const { pipeline, Transform } = require('stream')
const fs = require('fs')

const link = 'https://giveawaylisting.com/hamster-kombat/daily-cipher-code/'

class Str {
  #index = 0
  #str
  constructor(str) {
    this.#str = str
    this.length = str.length
    this.updateStatus()
  }
  updateStatus() {
    this.isDone = !this.hasMore()
  }
  current() {
    return this.#str[this.#index]
  }
  hasMore() {
    return this.length > this.#index
  }
  reset() {
    this.#index = 0
  }
  digest(c) {
    if (this.hasMore()) {
      if (this.current() === c)
        this.#index += 1
      else if (this.#index !== 0) {
        this.#index = 0
        this.updateStatus()
      }
    } else if (!this.isDone)
      this.isDone = true
    return this.isDone
  }
}

class StringDigester {
  isInRange = false
  isDone = false
  constructor(start, end) {
    this.start = new Str(start)
    this.end = new Str(end)
  }
  digest(c) {
    if (this.isDone)
      return false
    else {
      if (this.isInRange) {
        this.isDone = this.end.digest(c)
        if (this.isDone)
          this.isInRange = false
      } else
        this.isInRange = this.start.digest(c)
      return this.isInRange
    }
  }
}

function downlaod() {
  const file = fs.createWriteStream('original.html')
  return new Promise((resolve, reject) => {
    file.on('finish', () => {
      file.close()
      console.log('Downloaded')
      resolve()
    })
    https.get(link, (res) => res.pipe(file))
      .on('error', (error) => reject(error))
  })
}

function extract() {
  const input = fs.createReadStream('original.html', { highWaterMark: 1024 })
  const output = fs.createWriteStream('cipher.html')
  const digester = new StringDigester('<figure class="wp-block-table">', '</table>')
  let isFirst = true
  const transformer = new Transform({
    transform(chunk, _, next) {
      if (isFirst) {
        isFirst = false
        this.push(header())
      }
      let str = chunk.toString()
      for (c of str) {
        if (digester.digest(c)) this.push(c)
        if (digester.isDone) break
      }
      if (digester.isDone)
        this.push(footer())
      else
        next()
    },
    final() {
      console.log('Extracted')
    },
  })
  pipeline(input, transformer, output, (err) => err && console.log(err.message))
  function header() {
    return '<html><meta charset="UTF-8"><style>td{font-size:3em;}</style>'
  }
  function footer() {
    return '</html>'
  }
}

downlaod()
  .then(() => extract())
  .catch(err => console.log(err))
