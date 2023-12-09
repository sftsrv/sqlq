import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class Get extends AppCommand {
  static args = {
    id: Args.integer({description: 'ID of history entry', required: true}),
  }

  static description = 'Get a history entry'

  static examples = []

  static flags = {
    format,
  }

  async run(): Promise<any> {
    const {flags, args} = await this.parse(Get)
    const {id} = args
    const {format} = flags

    const result = await this.sqlqdb.history.findFirst({
      where: {
        id,
      },
    })

    if (!result) {
      ux.error(`History with id '${id}' not found`)
    }

    printFormatted(format, result)
  }
}
