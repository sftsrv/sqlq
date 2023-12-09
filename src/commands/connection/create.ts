import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class Create extends AppCommand {
  static args = {
    alias: Args.string({description: 'Alias for connection', required: true}),
    connectionString: Args.string({description: 'Connection string for database', required: true}),
  }

  static description = 'Exec a query on the given database'

  static examples = []

  static flags = {
    format,
    description: Flags.string({description: 'Description of connection', required: false, aliases: ['d']}),
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Create)
    const {alias, connectionString} = args
    const {format, description} = flags

    const connection = await this.db.connection.findFirst({
      where: {
        alias,
      },
    })

    if (connection) {
      ux.error(`Connection with alias ${alias} already exists`)
    }

    const result = await this.db.connection.create({
      data: {
        alias,
        connectionString,
        description,
      },
    })

    printFormatted(format, result)
  }
}
