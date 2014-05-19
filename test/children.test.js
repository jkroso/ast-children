
var parse = require('esprima').parse
var children = require('..')

var ast = parse(String(function program(){
  var a = 1, b
  b = 2
  if (1) 1
  try {1} catch (e) {e}
  [1,2,3]
  if (true) return a + b
}))

var fn = ast.body[0]
var body = fn.body.body
var vars = body[0]
var assign = body[1].expression
var cond = body[2]
var tc = body[3]
var arr = body[4].expression

it('functions', function(){
  eql(children(fn), [{name: 'program'}, {type:'BlockStatement'}])
})

it('arrays', function(){
  eql(children(arr), [{value:1}, {value:2}, {value:3}])
})

it('if', function(){
  eql(children(cond), [{value: 1}, {value: 1}])
  eql(children(cond).length, 2)
})

it('try', function(){
  eql(children(tc), [{type:'BlockStatement'}, {type: 'CatchClause'}])
})

it('catch', function(){
  var ctch = tc.handlers[0]
  eql(children(ctch), [
    {type: 'Identifier', name: 'e'},
    {type: 'BlockStatement'}
  ])
})
