import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, outfile, outputData} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class Create extends AppCommand {
  static args = {
    alias: Args.string({description: 'Alias for connection', required: true}),
    connectionString: Args.string({description: 'Connection string for database', required: true}),
    description: Args.string({description: 'Description of connection', required: false}),
  }

  static description = 'Update a connection'

  static examples = []

  static flags = {
    format,
    outfile,
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Create)
    const {alias, connectionString, description} = args
    const {format, outfile} = flags

    const result = await this.sqlqdb.connection.update({
      where: {
        alias,
      },
      data: {
        description,
        connectionString,
        updated: new Date(),
      },
    })

    outputData(format, outfile, result)
  }
}
