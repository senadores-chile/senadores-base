const assert = require('assert')
const validate = require('rut.js').validate

// Remove accent vocals
// (str) -> str
function removeAccent (str) {
  assert.equal(typeof str, 'string', 'Sólo se puede remover acentos de strings')
  return str
          .replace(/á/g, 'a')
          .replace(/é/g, 'e')
          .replace(/í/g, 'i')
          .replace(/ó/g, 'o')
          .replace(/ú/g, 'u')
          .replace(/Á/g, 'A')
          .replace(/É/g, 'E')
          .replace(/Í/g, 'I')
          .replace(/Ó/g, 'O')
          .replace(/Ú/g, 'U')
}

// Remove the dots of a string
// (str) -> str
function removeDots (str) {
  assert.equal(typeof str, 'string', 'Sólo se puede remover puntos de strings')

  return str.replace(/\./g, '')
}

// Wrap a string to prevent search errors for case mismatch and untrimed strings
// (str) -> str
function wrapString (str) {
  return str ? removeAccent(removeDots(str)).toUpperCase().trim() : ''
}

// Apply a specific filter with specific options to a senators array
// (arr, obj) -> arr
function filter (arrayToFilter, options) {
  // conditions
  const nameFilter = (senador, nombre) => {
    assert(typeof nombre === 'string' || nombre instanceof RegExp, 'El nombre solo se puede filtrar por string o expresion regular')

    return typeof nombre === 'string' ? wrapString(senador.nombre).indexOf(wrapString(nombre)) > -1 : nombre.test(senador.nombre)
  }
  const rutFilter = (senador, rut) => {
    assert(validate(rut), 'el rut de busqueda ingresado no es valido')

    return wrapString(senador.rut) === wrapString(rut)
  }
  const defualtRutFilter = (senador, rut) => {
    rut = rut.toString()

    return senador.rut.split('-')[0] === rut
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

  const _filter = elem => {
    if (elem.hasOwnProperty('senador')) elem = elem.senador
    // default queries
    if (typeof options === 'string' && elem) return nameFilter(elem, options)
    if (typeof options === 'number' && elem) return defualtRutFilter(elem, options)

    return (options.nombre ? nameFilter(elem, options.nombre) : true) &&
           (options.rut ? rutFilter(elem, options.rut) : true) &&
           (options.region ? regionFilter(elem, options.region) : true) &&
           (options.circunscripcion ? circunscripcionFilter(elem, options.circunscripcion) : true) &&
           (options.telefono ? telefonoFilter(elem, options.telefono) : true) &&
           (options.mail ? mailFilter(elem, options.mail) : true) &&
           (options.partido ? partidoFilter(elem, options.partido) : true)
  }
  return arrayToFilter.filter(_filter)
}

exports.filter = filter
exports.wrapString = wrapString
