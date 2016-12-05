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

Función que retorna siempre un arreglo con los senadores encontrados luego de aplicar los filtros ingresados en la variable query. El parametro `query` es opcional, si no se ingresa, se retornan todos los senadores, si se ingresa un string, se busca por nombre, si se ingresa un numero, se busca por rut, si se ingresa un objeto, se busca por cada uno de los campos ingresados (para más información, revisa los [tests](/test.js)).

## Otros enlaces

- [senadores](https://github.com/YerkoPalma/senadores) - Datos publicos disponibles en la pagina www.senado.cl.
- [senadores-asistencia](https://github.com/YerkoPalma/senadores-asistencia) - Observador de la asistencia de senadores tanto a sesiones de sala como a comisiones del senado de Chile.
- [senadores-detalle](https://github.com/YerkoPalma/senadores-detalle) - Detalle complementario a la información base de cada senador.

## Licencia

[MIT](/license) © [Yerko Palma](https://github.com/YerkoPalma).
