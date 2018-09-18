#!/usr/bin/env node
const process = require('process')
const logo = require('./logo')
const packageJson = require('../package.json')
const main = require('./main')
const {
  cred,
  parse,
  cyellow,
  info,
  cgreen
} = require('./utils')


const argv = parse(process.argv)
switch(argv) {
  case '':
    main()
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

