module.exports = {
  async up(db) {
    await db.createCollection('customers', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          properties: {
            name: {
              bsonType: 'string'
            },
            segment1: {
              bsonType: 'bool'
            },
            segment2: {
              bsonType: 'bool'
            },
            segment3: {
              bsonType: 'bool'
            },
            segment4: {
              bsonType: 'bool'
            },
            platformId: {
              bsonType: 'number'
            },
            clientId: {
              bsonType: 'number'
            }
          }
        }
      }
    })
  },

  async down(db) {
    await db.collection('customers').drop((err) => {
      console.log(`Collection [customers]  was deleted`)
    })
  }
}
