# senadores-base [![npm version](https://img.shields.io/npm/v/senadores-base.svg?style=flat-square)](https://www.npmjs.com/package/senadores-base) [![Build Status](https://img.shields.io/travis/YerkoPalma/senadores-base/master.svg?style=flat-square)](https://travis-ci.org/YerkoPalma/senadores-base) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> Información basica y estatica de los senadores actuales de Chile

## Installation

```bash
npm install --save senadores-base
```

## Usage

```javascript
var senadoresBase = require('senadores-base')

senadoresBase({ nombre: 'Allamand' })
/*
    {
        nombre: 'Allamand Zavala, Andrés',
        rut: '5002921-2',
        region: 'Región Metropolitana ',
        circunscripcion: 7,
        telefono: '(56-32) 2504701',
        mail: 'allamand@senado.cl'
    }
*/
```

## License

[MIT](/license)

Crafted by Yerko ([@yerko_palma](https://twitter.com/yerko_palma)).
