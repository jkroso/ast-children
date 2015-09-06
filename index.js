const keys = require('./keys.json')
const push = [].push

const children = (node) => {
  const addChild = (out, key) => {
    const child = node[key]
    Array.isArray(child)
      ? push.apply(out, child)
      : out.push(child)
    return out
  }
  return keys[node.type].reduce(addChild, [])
}

export default children
