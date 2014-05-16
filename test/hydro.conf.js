
/**
 * Hydro configuration
 *
 * @param {Hydro} hydro
 */

module.exports = function(hydro) {
  hydro.set({
    suite: 'ast-children',
    timeout: 500,
    plugins: [
      require('hydro-bdd')
    ],
    globals: {
      assert: require('assert/'),
      match: require('match'),
      eql: function(a, b){assert(match(a, b))}
    }
  })
}
