const fs = require('fs')
const path = require('path')
const process = require('process')

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
  
  -l  show the tree with package version
  -v  output the version number
  -h  output usage information
`

const parse = (arr) => arr.slice(2).join(' ')

const checkFile = (path) => {
  try {
    fs.accessSync(path, fs.constants.R_OK)
    return fs.statSync(path)
  } catch (err) {
    return undefined
  }
}

const readPackage = (dir) => fs.readFileSync(dir).toString()

const list = (dir, padding, parent, option, showVersion = false) => {
  const jsonPath = path.resolve(dir, 'package.json')

  if (!checkFile(jsonPath)) {
    cred(
      `Error: ${path.join(dir, 'package.json')} is inaccessible.`
    )
    console.log(`Please check your directory, You might need to run 'npm install or yarn'.`)
    process.exit(1)
  }

  const content = readPackage(jsonPath)
  const { dependencies, name } = JSON.parse(content)

  if (typeof dependencies === 'object') {
    const packages = Object.keys(dependencies)
    const length = packages.length
    if (length) {
      const isModule = dir.includes('node_modules')

      if (!isModule) {
        console.log(name)
        option.number = length
      } else {
        padding += '│   '
      }

      option.pkg.push(name)

      packages.map((item, index) => {
        const symbol = index !== (length - 1) ? '├──' : '└──'

        if (parent === '└──') {
          padding = padding.substring(0, padding.length - 4) + '    '
        }

        const suffix = showVersion ? `@${dependencies[item]}` : ''
        console.log(`${padding}${symbol} ${item}${suffix}`)

        option.arr.push(item)
        const sliceCount = padding.length / 4
        option.pkg = option.pkg.slice(0, sliceCount)
        if (option.pkg.includes(item)) {
          // avoid cyclic dependence
          return
        }

        const newPath = !isModule
          ? path.resolve(dir, path.join('node_modules', item))
          : path.resolve(dir, path.join('..', item))

        list(newPath, padding, symbol, option, showVersion)
      })
    }
  }
}

module.exports = {
  cred,
  parse,
  cyellow,
  info,
  cgreen,
  checkFile,
  readPackage,
  list
}
