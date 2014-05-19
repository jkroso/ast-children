
module.exports = children

function children(node){
  var fn = children[node.type]
  if (fn) return fn(node)
  return []
}

function get(prop){
  return function(obj){ return obj[prop] }
}

children.VariableDeclaration = get('declarations')
children.SequenceExpression = get('expressions')
children.ArrayExpression = get('elements')
children.BlockStatement =
children.Program = get('body')

children.VariableDeclarator = function(node){
  return node.init ? [node.id, node.init] : [node.id]
}

children.ExpressionStatement = function(node){
  return [node.expression]
}

children.FunctionExpression =
children.FunctionDeclaration = function(node){
  return node.id
    ? node.params.concat(node.id, node.body)
    : node.params.concat(node.body)
}

children.IfStatement =
children.ConditionalExpression = function(node){
  var out = [node.test]
  if (node.consequent) out.push(node.consequent)
  if (node.alternate) out.push(node.alternate)
  return out
}

children.WithStatement = function(node){
  return [node.object, node.body]
}

children.SwitchStatement = function(node){
  var out = [node.discriminant]
  node.cases.forEach(function(c){
    out.push(c.test, c.consequent)
  })
  return out
}

children.ThrowStatement =
children.UnaryExpression =
children.ReturnStatement =
children.UpdateExpression = function(node){
  return [node.argument]
}

children.TryStatement = function(node){
  var out = [node.block]
  if (node.handlers) out.push.apply(out, node.handlers)
  if (node.finalizer) out.push(node.finalizer)
  return out
}

children.CatchClause = function(node){
  return [node.param, node.body]
}

children.WhileStatement =
children.DoWhileStatement = function(node){
  return [node.test, node.body]
}

children.ForStatement = function(node){
  var out = []
  if (node.init) out.push(node.init)
  if (node.test) out.push(node.test)
  if (node.body) out.push(node.body)
  if (node.update) out.push(node.update)
  return out
}

children.ForInStatement = function(node){
  return [node.left, node.right, node.body]
}

children.ObjectExpression = function(node){
  return node.properties.map(get('value'))
}

children.BinaryExpression =
children.LogicalExpression =
children.AssignmentExpression = function(node){
  return [node.left, node.right]
}

children.NewExpression =
children.CallExpression = function(node){
  return [node.callee].concat(node.arguments)
}

children.MemberExpression = function(node){
  return [node.object, node.property]
}
