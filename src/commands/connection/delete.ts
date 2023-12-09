import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class Delete extends AppCommand {
  static args = {
    alias: Args.string({description: 'Alias of connection to delete', required: true}),
  }

  static description = 'Delete a connection'

  static examples = []

  static flags = {
    format,
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Delete)
    const {alias} = args
    const {format} = flags

    const result = await this.db.connection.delete({
      where: {
        alias,
      },
    })

    printFormatted(format, result)
  }
}
