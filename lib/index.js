#!/usr/bin/env node
const process = require('process')

const logo = require('./logo')
const packageJson = require('../package.json')
const {
  parse,
  cyellow,
  info,
  cgreen,
  list
} = require('./utils')

const argv = parse(process.argv)
switch (argv) {
  case '':
  case '-l':
    const option = { number: 0, arr: [], pkg: [] }
    list(process.cwd(), '', 0, option, argv === '-l')
    const len = new Set(option.arr).size
    console.log(
      `\n${option.number} direct dependencies, total ${len} dependencies`
    )
    break
  case '-v':
    console.log(packageJson.version)
    break
  case '-h':
    cgreen(logo)
    console.log(info)
    break
  default:
    cyellow(`Invalid command: ${argv}`)
    console.log('See -h for a list of available commands.')
}
