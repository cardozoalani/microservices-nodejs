/* eslint-disable @typescript-eslint/no-var-requires */
const customers = require('./customers.json')

module.exports = {
  async up(db) {
    await db.collection('customers').insertMany([...customers], (err) => {
      console.log('Insertion completed successfully!!!')
    })
  },

  async down(db) {
    await db.collection('customers').deleteMany({}, (err) => {
      console.log('All items removed from customers collection successfully!!!')
    })
  }
}
