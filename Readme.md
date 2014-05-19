
# ast-children

  get the children of an AST node

## Installation

With your favorite package manager:

- [packin](//github.com/jkroso/packin): `packin add ast-children`
- [component](//github.com/component/component#installing-packages): `component install jkroso/ast-children`
- [npm](//npmjs.org/doc/cli/npm-install.html): `npm install ast-children`

then in your app:

```js
var children = require('ast-children')
```

## API

### children(node)

Takes a [standard](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API) AST node and returns an `Array` of its child nodes

```js
var ast = {
  type: 'Program',
  body: [
    {
      type: 'VariableDeclaration',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {type: 'Identifier', name: 'a'},
          init: {type: 'Literal', value: 1}
        },
        {
          type: 'VariableDeclarator',
          id: {type: 'Identifier', name: 'b'}
        }
      ]
    }
  ]
}
children(ast) // => ast.body
children(ast.body[0]) // => ast.body[0].declarations
var decs = ast.body[0].declarations
children(decs[0]) // => [decs[0].id, decs[0].init]
children(decs[1]) // => [decs[1].id]
```
