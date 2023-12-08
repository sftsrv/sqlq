import {Args, Command} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'

export default class Exec extends Command {
  static args = {
    search: Args.string({description: 'Search for a connection by alias', required: false}),
  }

  static description = 'List all saved connections'

  static examples = []

  static flags = {
    format,
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Exec)
    const {search = ''} = args

    const result = await sqlqdb.connection.findMany({
      where: {
        alias: {
          contains: search,
        },
      },
    })

    printFormatted(flags.format, result)
  }
}
