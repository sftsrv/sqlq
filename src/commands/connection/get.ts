import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class Get extends AppCommand {
  static args = {
    alias: Args.string({description: 'Alias for connection', required: true}),
  }

  static description = 'Get connection'

  static examples = []

  static flags = {
    format,
  }

  async run(): Promise<any> {
    const {flags, args} = await this.parse(Get)
    const {alias} = args
    const {format} = flags

    const result = await this.load(
      'Searching',
      this.db.connection.findFirst({
        where: {
          alias,
        },
      }),
    )

    this.assertConnectionExists(alias, result)

    printFormatted(format, result)
  }
}
