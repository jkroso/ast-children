
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
    ]
  })
}
