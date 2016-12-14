'use strict'
const senadores = require('./senadores.json')
const wrapString = require('./utils.js').wrapString
const filter = require('./utils.js').filter

// Filter an array of senators against multiple conditions
// (obj) -> arr
module.exports = function senadoresBase (options) {
  options = options || {}

  // Get a single senator from the senators array
  // (str|num) -> obj
  const getSenator = senatorId => {
    if (typeof senatorId === 'string') {
      return senadores.filter(senador => {
        return typeof senatorId === 'string' ? wrapString(senador.nombre).indexOf(wrapString(senatorId)) > -1 : senatorId.test(senador.nombre)
      })[0]
    }
    if (typeof senatorId === 'number') {
      return senadores.filter(senador => {
        let rut = senatorId.toString()

        return senador.rut.split('-')[0] === rut
      })[0]
    }
  }

  return Array.isArray(options) ? options.map(getSenator) : filter(senadores, options)
}
