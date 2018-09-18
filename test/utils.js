import test from 'ava'
import fs from 'fs'
import utils from '../lib/utils'

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

})
