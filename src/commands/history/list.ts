import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class List extends AppCommand {
  static args = {
    search: Args.string({description: 'Part of a query to search for', required: false}),
  }

  static aliases = ['ls']

  static description = 'Search query history'

  static examples = []

  static flags = {
    format,
    alias: Flags.string({description: 'Alias for connection', required: false, aliases: ['a']}),
    aliasExact: Flags.boolean({
      description: 'If alias should match exactly',
      required: false,
      default: false,
    }),
    count: Flags.integer({description: 'Maximum number of results to return', required: false, default: 20}),
  }

  async run(): Promise<any> {
    const {flags, args} = await this.parse(List)
    const {search = ''} = args
    const {alias = '', count, aliasExact, format} = flags

    const result = await this.load(
      'Searching',
      this.db.history.findMany({
        take: count,
        orderBy: {
          lastUsed: 'desc',
        },

        where: {
          AND: [
            {
              query: {
                contains: search,
              },
            },
            {
              connectionAlias: {
                equals: aliasExact ? alias : undefined,
                contains: aliasExact ? undefined : alias,
              },
            },
          ],
        },
      }),
    )

    printFormatted(format, result)
  }
}
