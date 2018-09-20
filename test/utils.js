import test from 'ava'
import utils from '../lib/utils'
// eslint-disable-next-line
import child_process from 'child_process'
import packageJson from '../package.json'

test('Parse CLI arguments correctly.', t => {
  const parse = utils.parse
  const base = ['node_path', 'file_path']

  t.is(parse(base), '')
  t.is(parse(base.concat('-v')), '-v')
  t.is(parse(base.concat('-h')), '-h')
  t.is(parse(base.concat('cli test')), 'cli test')
})

test('Check if file exists', t => {
  const checkFile = utils.checkFile

  t.is(checkFile('./test.md'), undefined)
  t.is(!!checkFile('package.json'), true)
})

test('Read file content', t => {
  const readPackage = utils.readPackage
  t.is(readPackage('test/test.md'), 'This is a test file.')
})

test('Output correct version', t => {
  // eslint-disable-next-line
  const { execSync } = child_process
  t.is(
    execSync('node lib/index.js -v').toString().replace('\n', ''),
    packageJson.version
  )
})
