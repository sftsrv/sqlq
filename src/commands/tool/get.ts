import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class Get extends AppCommand {
  static args = {
    name: Args.string({description: 'Name of tool', required: true}),
  }

  static description = 'Get a tool'

  static examples = []

  static flags = {
    format,
  }

  async run(): Promise<any> {
    const {flags, args} = await this.parse(Get)
    const {name} = args
    const {format} = flags

    const result = await this.load(
      'Searching',
      this.db.tool.findFirst({
        where: {
          name,
        },
      }),
    )

    if (!result) {
      ux.error(`Tool with name '${name}' not found`)
    }

    printFormatted(format, result)
  }
}