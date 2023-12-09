import {Args, Command, Flags} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, outfile, outputData} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class List extends AppCommand {
  static args = {
    search: Args.string({
      description: 'Search for a connection by alias, description, or conection string',
      required: false,
    }),
  }

  static aliases = ['connection:ls', 'conn:ls']

  static description = 'List all saved connections'

  static examples = []

  static flags = {
    format,
    outfile,
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(List)
    const {search = ''} = args
    const {format, outfile} = flags

    const result = await this.sqlqdb.connection.findMany({
      where: {
        OR: [
          {
            alias: {
              contains: search,
            },
          },
          {
            connectionString: {
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

    outputData(format, outfile, result)
  }
}
