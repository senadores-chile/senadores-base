import test from 'ava'
import senadoresBase from './'

test('default queries', t => {
  t.plan(4)

  // search by name
  t.is(senadoresBase('Allamand').length, 1)
  t.deepEqual(senadoresBase('Allamand')[0], {
    id: 905,
    nombre: 'Allamand Zavala, Andrés',
    rut: '5002921-2',
    region: 'Región Metropolitana ',
    circunscripcion: 7,
    telefono: '(56-32) 2504701',
    mail: 'allamand@senado.cl',
    partido: 'R.N.'
  })

  // search by rut
  t.is(senadoresBase(13829856).length, 1)
  t.deepEqual(senadoresBase(13829856)[0], {
    id: 687,
    nombre: 'Coloma Correa, Juan Antonio',
    rut: '13829856-6',
    region: 'Región del Maule',
    circunscripcion: 10,
    telefono: '(56-32) 2504505',
    mail: 'jcoloma@senado.cl',
    partido: 'U.D.I.'
  })
})

test('valid individual queries', t => {
  t.plan(10)

  t.is(senadoresBase().length, 38)

  // search by name
  t.deepEqual(senadoresBase({ nombre: 'Allamand' })[0], {
    id: 905,
    nombre: 'Allamand Zavala, Andrés',
    rut: '5002921-2',
    region: 'Región Metropolitana ',
    circunscripcion: 7,
    telefono: '(56-32) 2504701',
    mail: 'allamand@senado.cl',
    partido: 'R.N.'
  })
  t.is(senadoresBase({ nombre: /Juan/ }).length, 2)

  // search by rut
  t.deepEqual(senadoresBase({ rut: '12615234-5' })[0], {
    id: 1110,
    nombre: 'Araya Guerrero, Pedro',
    rut: '12615234-5',
    region: 'Región de Antofagasta',
    circunscripcion: 2,
    telefono: '(56-32) 2504703',
    mail: 'paraya@senado.cl',
    partido: 'Independiente'
  })

  // search by region
  t.is(senadoresBase({ region: 'Lagos' }).length, 2)
  t.is(senadoresBase({ region: /Atacama/ }).length, 2)

  // search by circunscripcion
  t.is(senadoresBase({ circunscripcion: 4 }).length, 2)

  // search by telefono
  t.deepEqual(senadoresBase({ telefono: '2504671' })[0], {
    id: 985,
    nombre: 'Allende Bussi, Isabel',
    rut: '4465782-1',
    region: 'Región de Atacama',
    circunscripcion: 3,
    telefono: '(56-32) 2504671',
    mail: 'iallende@senado.cl',
    partido: 'P.S.'
  })

  // search by mail
  t.deepEqual(senadoresBase({ mail: /cbianchi/ })[0], {
    id: 907,
    nombre: 'Bianchi Chelech, Carlos',
    rut: '7452450-8',
    region: 'Región de Magallanes y la Antártica Chilena\n\n',
    circunscripcion: 19,
    telefono: '(56-32) 2504566',
    mail: 'cbianchi@senado.cl',
    partido: 'Independiente'
  })
  // search by partido
  t.is(senadoresBase({ partido: 'Independiente' }).length, 4)
})

test('chained queries', t => {
  t.plan(1)

  t.deepEqual(senadoresBase({
    nombre: 'Antonio',
    region: /Maule/,
    telefono: '2504505'
  })[0], {
    id: 687,
    nombre: 'Coloma Correa, Juan Antonio',
    rut: '13829856-6',
    region: 'Región del Maule',
    circunscripcion: 10,
    telefono: '(56-32) 2504505',
    mail: 'jcoloma@senado.cl',
    partido: 'U.D.I.'
  })
})

test.skip('invalid queries', t => {
  t.plan(2)

  t.throws(() => senadoresBase({ nombre: 1325 }), Error(''))
  t.throws(() => senadoresBase({ rut: '1-9' }), Error(''))
})
