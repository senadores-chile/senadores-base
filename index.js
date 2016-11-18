'use strict'
const senadores = require('./senadores.json')
const assert = require('assert')
const { validate } = require('rut.js')

// Wrap a string to prevent search errors for case mismatch and untrimed strings
// (str) -> str
function wrapString (str) {
  return str ? str.toUpperCase().trim() : ''
}

// Filter an array of objects against multiple conditions
// (obj) -> arr
module.exports = function senadoresBase (options) {
  options = options || {}

  // conditions
  const nameFilter = (senador, nombre) => {
    assert(typeof nombre === 'string' || nombre instanceof RegExp, 'El nombre solo se puede filtrar por string o expresion regular')

    return typeof nombre === 'string' ? wrapString(senador.nombre).indexOf(wrapString(nombre)) > -1 : nombre.test(senador.nombre)
  }
  const rutFilter = (senador, rut) => {
    assert(validate(rut), 'el rut de busqueda ingresado no es valido')

    return wrapString(senador.rut) === wrapString(rut)
  }
  const regionFilter = (senador, region) => {
    assert(typeof region === 'string' || region instanceof RegExp, 'La region solo se puede filtrar por string o expresion regular')

    return typeof region === 'string' ? wrapString(senador.region).indexOf(wrapString(region)) > -1 : region.test(senador.region)
  }
  const circunscripcionFilter = (senador, circunscripcion) => {
    assert.equal(typeof circunscripcion, 'number', 'La circunscripción ingresada para buscar debe ser un número')

    return senador.circunscripcion === circunscripcion
  }
  const telefonoFilter = (senador, telefono) => {
    assert(typeof telefono === 'string' || telefono instanceof RegExp, 'El telefono solo se puede filtrar por string o expresion regular')

    return typeof telefono === 'string' ? wrapString(senador.telefono).indexOf(wrapString(telefono)) > -1 : telefono.test(senador.telefono)
  }
  const mailFilter = (senador, mail) => {
    assert(typeof mail === 'string' || mail instanceof RegExp, 'El telefono solo se puede filtrar por string o expresion regular')

    return typeof mail === 'string' ? wrapString(senador.mail).indexOf(wrapString(mail)) > -1 : mail.test(senador.mail)
  }
  const partidoFilter = (senador, partido) => {
    assert(typeof partido === 'string' || partido instanceof RegExp, 'El telefono solo se puede filtrar por string o expresion regular')

    return typeof partido === 'string' ? wrapString(senador.partido).indexOf(wrapString(partido)) > -1 : partido.test(senador.partido)
  }

  const filter = elem => {
    return (options.nombre ? nameFilter(elem, options.nombre) : true) &&
           (options.rut ? rutFilter(elem, options.rut) : true) &&
           (options.region ? regionFilter(elem, options.region) : true) &&
           (options.circunscripcion ? circunscripcionFilter(elem, options.circunscripcion) : true) &&
           (options.telefono ? telefonoFilter(elem, options.telefono) : true) &&
           (options.mail ? mailFilter(elem, options.mail) : true) &&
           (options.partido ? partidoFilter(elem, options.partido) : true)
  }

  return senadores.filter(filter)
}
