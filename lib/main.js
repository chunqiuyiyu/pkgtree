const process = require('process')
const path = require('path')
const {
  checkFile,
  cred
} = require('./utils')

module.exports = () => {
  const jsonPath = path.resolve(process.cwd(), 'package.json')
  if(checkFile(jsonPath)) {
    
  } else {
    cred('Error: package.json not found, please try another directory.')
  }
}
