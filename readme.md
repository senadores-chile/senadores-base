# senadores-base [![npm version](https://img.shields.io/npm/v/senadores-base.svg?style=flat-square)](https://www.npmjs.com/package/senadores-base) [![Build Status](https://img.shields.io/travis/YerkoPalma/senadores-base/master.svg?style=flat-square)](https://travis-ci.org/YerkoPalma/senadores-base) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> Información basica y estatica de los senadores actuales de Chile

## Instalación

```bash
npm install --save senadores-base
```

## Uso

```javascript
var senadoresBase = require('senadores-base')

senadoresBase({ nombre: 'Allamand' })
/*
    [ { id: 905,
    nombre: 'Allamand Zavala, Andrés',
    rut: '5002921-2',
    region: 'Región Metropolitana ',
    circunscripcion: 7,
    telefono: '(56-32) 2504701',
    mail: 'allamand@senado.cl',
    partido: 'R.N.' } ]
*/
```

## API

### `senadoresBase([query])`

Función que retorna siempre un arreglo con los senadores encontrados luego de aplicar los filtros ingresados en la variable query.
El parametro `query` es opcional y sirve para filtrar el arreglo de senadores:

- si no se ingresa, se retornan todos los senadores
- si se ingresa un string, se busca por nombre
- si se ingresa un numero, se busca por rut
- si se ingresa un objeto, se busca por cada uno de los campos ingresados
- si se ingresa un arreglo, se espera que el arreglo tenga valores numericos o strings, y que correspondan a ruts o nombres de senadores.

(para más información, revisa los [tests](/test.js)).

### `filter(array [, query])`

También se expone una función `filter` que sirve para filtrar arreglos de senadores, util para los [otros modulos](#otros-enlaces) de senadores.

- `array`: El arreglo que contiene los senadores. Puede ser un arreglo de objetos que contienen las propiedades de los senadores (como el devuelto por este modulo), o un arreglo de objetos que tienen dentro de sus primeras propiedades algún campo llamado 'senador'.
- `query`: El mismo query que acepta este modulo para filtrar. _*_

_* Notese que el filtro no acepta ingresar un arreglo como filtro, es decir, los unicos queries que no funcionarán igual son los de este estilo `filter(senadores, ['Allende', 'Allamand'])`_

#### Ejemplo

```js
const { filter } = require('senadores-base/utils')

const arr1 = senadores() // este modulo
const arr2 = [{
    senador: {
      // datos de un senador
    },
    // alguna otra propiedad
  }]

// usos
assert.deepEqual(filter(arr1, 'Allamand'), filter(arr2, 'Allamand').senador) // true
```

## Otros enlaces

- [senadores](https://github.com/YerkoPalma/senadores) - Datos publicos disponibles en la pagina www.senado.cl.
- [senadores-asistencia](https://github.com/YerkoPalma/senadores-asistencia) - Observador de la asistencia de senadores tanto a sesiones de sala como a comisiones del senado de Chile.
- [senadores-detalle](https://github.com/YerkoPalma/senadores-detalle) - Detalle complementario a la información base de cada senador.

## Licencia

[MIT](/license) © [Yerko Palma](https://github.com/YerkoPalma).
