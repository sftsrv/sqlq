import {PrismaClient} from '@prisma/client'

const client = new PrismaClient()

const seed = async () => {
  const alias = 'sqlq'
  const connectionString = 'file:./app.db'
  const description = 'SQLQ application data'

  return client.connection.upsert({
    where: {
      alias,
    },
    update: {},
    create: {
      alias,
      connectionString,
      description,
      editable: false,
    },
  })
}

seed().catch((err) => console.error('Error seeding application database', seed))
