import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, outfile, outputData} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class Delete extends AppCommand {
  static args = {
    alias: Args.string({description: 'Alias of connection to delete', required: true}),
  }

  static description = 'Delete a connection'

  static examples = []

  static aliases = ['conn:delete']

  static flags = {
    format,
    outfile,
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Delete)
    const {alias} = args
    const {format, outfile} = flags

    const result = await this.sqlqdb.connection.delete({
      where: {
        alias,
        editable: false,
      },
    })

    outputData(format, outfile, result)
  }
}
