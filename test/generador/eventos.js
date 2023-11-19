import { faker } from '@faker-js/faker/locale/es'

const get = _ => ({
     nombre : faker.company.catchPhrase(),
     categoria : faker.commerce.department(),
     ciudad : faker.location.city(),
     hora : faker.number.int({min:0, max:23}),
     dia : faker.date.between({ from: '2023-11-23T00:00:00.000Z', to: '2023-11-30T00:00:00.000Z' }),
     descripcion : faker.lorem.sentence(),
})

export default {
    get
}