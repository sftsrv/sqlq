import {Args, Command, Flags} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'

export default class Exec extends Command {
  static args = {
    alias: Args.string({description: 'Alias for connection', required: true}),
    connectionString: Args.string({description: 'Connection string for database', required: true}),
  }

  static description = 'Exec a query on the given database'

  static examples = []

  static flags = {
    format,
    description: Flags.string({description: 'Description of connection', required: true}),
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Exec)
    const {alias, connectionString} = args
    const {format, description} = flags

    const connection = await sqlqdb.connection.findFirst({
      where: {
        alias,
      },
    })

    const result = await sqlqdb.connection.create({
      data: {
        alias,
        connectionString,
        description,
      },
    })

    printFormatted(flags.format, result)
  }
}
