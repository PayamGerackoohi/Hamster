const https = require('https')
const { pipeline, Transform } = require('stream')
const fs = require('fs')

function makeTempDir() {
  if (!fs.existsSync('temp'))
    fs.mkdirSync('temp')
}

function downlaod({ link, output }) {
  return new Promise((resolve, reject) => {
    const outputFile = fs.createWriteStream(output)
    outputFile.on('finish', () => {
      outputFile.close()
      resolve(output)
    })
    https.get(link, (res) => res.pipe(outputFile))
      .on('error', (error) => reject(error))
  })
}

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

function extractFromFile({ input, output, digester }) {
  return new Promise(async (resolve, reject) => {
    pipeline(
      fs.createReadStream(input, { highWaterMark: 1024 }),
      new Transform({
        transform(chunk, _, next) {
          if (!digester.isDone) {
            let str = chunk.toString()
            for (c of str) {
              if (digester.digest(c)) this.push(c)
              if (digester.isDone) break
            }
          }
          next()
        },
      }),
      fs.createWriteStream(output),
      (err) => {
        if (err) reject(err.message)
        else resolve(output)
      })
  })
}

module.exports = {
  makeTempDir,
  downlaod,
  extractFromFile,
  StringDigester,
}