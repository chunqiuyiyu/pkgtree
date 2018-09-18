const fs = require('fs')

const cred = (str) => {
  console.log(`\x1b[31m${str}\x1b[0m`)
}

const cyellow = (str) => {
  console.log(`\x1b[33m${str}\x1b[0m`)
}

const cgreen = (str) => {
  console.log(`\x1b[32m${str}\x1b[0m`)
}

const info =
`Usage: pkgtree [input]

Show dependency tree of node project.

Options:

  -v  output the version number
  -h  output usage information`

const parse = (arr) => arr.slice(2).join(' ')
const checkFile = (path) => {
  try {
    fs.accessSync(path, fs.constants.R_OK)
    return fs.statSync(path)
  } catch (err) {
    return undefined
  }
}

const readPackage = (dir) => fs.readFile(dir).toString()

module.exports = {
  cred,
  parse,
  cyellow,
  info,
  cgreen,
  checkFile
}
