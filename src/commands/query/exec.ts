import {Args, Command} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'

export default class Exec extends Command {
  static args = {
    alias: Args.string({description: 'Alias for connection', required: true}),
    query: Args.string({description: 'Query to run on database', required: true}),
  }

  static description = 'Exec a query on the given database'

  static examples = []

  static flags = {
    format,
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Exec)
    const {alias, query} = args

    const connection = await sqlqdb.connection.findFirst({
      where: {
        alias,
      },
    })

    if (!connection) {
      throw new Error(`Connection with alias ${alias} not found`)
    }

    const client = new PrismaClient({
      datasourceUrl: connection.connectionString,
    })

    console.log('Executing Query')
    const result = await client.$queryRawUnsafe(query)

    printFormatted(flags.format, result)
    await sqlqdb.history.create({
      data: {
        connectionId: connection.id,
        query,
      },
    })
  }
}
