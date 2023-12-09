import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class List extends AppCommand {
  static args = {
    search: Args.string({description: 'Part of a query to search for', required: false}),
  }

  static aliases = ['tool:ls']

  static description = 'Search tools'

  static examples = []

  static flags = {
    format,
    count: Flags.integer({description: 'Maximum number of results to return', required: false, default: 20}),
  }

  async run(): Promise<any> {
    const {flags, args} = await this.parse(List)
    const {search = ''} = args
    const {count, format} = flags

    const result = await this.sqlqdb.tool.findMany({
      take: count,
      orderBy: {
        lastUsed: 'desc',
      },
      where: {
        OR: [
          {
            query: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      },
    })

    printFormatted(format, result)
  }
}
