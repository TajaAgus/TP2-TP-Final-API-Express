import { faker } from '@faker-js/faker/locale/en'

const get = _ => ({
     nombre : faker.company.catchPhrase(),
     categoria : faker.commerce.department(),
     ciudad : faker.location.city(),
     hora : faker.time.recent(),
     dia : faker.date.future().toLocaleDateString(),
     descripcion : faker.lorem.sentence(),
})

console.log(get())

export default {
    get
}