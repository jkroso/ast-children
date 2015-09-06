const parse = require('esprima').parse
const assert = require('assert/')
const match = require('match')
const children = require('..')

const eql = (a, b) => assert(match(a, b))

const ast = parse(String(function program(){
  var a = 1, b
  b = 2
  if (1) 1
  try {1} catch (e) {e}
  [1,2,3]
  if (true) return a + b
}))

const fn = ast.body[0]
const body = fn.body.body
const cond = body[2]
const tc = body[3]
const arr = body[4].expression

it('functions', () => {
  eql(children(fn), [{name: 'program'}, {type:'BlockStatement'}])
})

it('arrays', () => {
  eql(children(arr), [{value:1}, {value:2}, {value:3}])
})

it('if', () => {
  eql(children(cond), [{value: 1}, {value: 1}])
  eql(children(cond).length, 3)
})

it('try', () => {
  eql(children(tc), [{type:'BlockStatement'}, {type: 'CatchClause'}])
})

it('catch', () => {
  const ctch = tc.handlers[0]
  eql(children(ctch), [
    {type: 'Identifier', name: 'e'},
    {type: 'BlockStatement'}
  ])
})
