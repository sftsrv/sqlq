import {PrismaClient} from '@prisma/client'
import {resolve} from 'path'

const client = new PrismaClient()

const seed = async () => {
  const alias = 'sqlq-sample'
  const description = 'Sample SQLite DB'
  const connectionString = resolve('./sample.db')

  return client.connection.upsert({
    where: {
      alias,
    },
    update: {},
    create: {
      alias,
      connectionString,
      description,
      driver: 'sqlite',
      editable: false,
    },
  })
}

seed().catch((err) => console.error('Error seeding application database', seed))
