import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class List extends AppCommand {
  static args = {
    id: Args.integer({description: 'Part of a query to search for', required: false}),
  }

  static description = 'Get query from history'

  static examples = []

  static flags = {
    format,
  }

  async run(): Promise<any> {
    const {flags, args} = await this.parse(List)
    const {id} = args
    const {format} = flags

    const result = await this.load(
      'Searching',
      this.db.history.findFirst({
        where: {
          id,
        },
      }),
    )

    printFormatted(format, result)
  }
}
