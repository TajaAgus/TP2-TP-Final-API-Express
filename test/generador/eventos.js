import { faker } from '@faker-js/faker/locale/en'

const get = _ => ({

    
     nombre : faker.company.catchPhrase(),
     categoria : faker.commerce.department(),
     ciudad : faker.location.city(),
     hora : faker.date.soon().toLocaleTimeString('en-US', { hour: '2-digit', hour12: true }).replace(/[^\w\s]/gi, '').replace(/\s/g, ''),
     dia : faker.date.soon().toLocaleDateString('es-ES').split('/').join('-'),
     descripcion : faker.lorem.sentence(),
})

console.log(get())

export default {
    get
}