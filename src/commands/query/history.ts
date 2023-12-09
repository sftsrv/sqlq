import {Args, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {AppCommand} from '../../AppCommand.js'

export default class SQL extends AppCommand {
  static args = {
    id: Args.integer({description: 'ID of history command to execute', required: true}),
  }

  static description = 'Re-run a previous database query'

  static examples = []

  static flags = {
    format,
    withAlias: Flags.string({description: 'Override the initial alias used to run the command', required: false}),
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(SQL)
    const {id} = args
    const {format, withAlias} = flags

    const history = await this.db.history.findFirst({
      where: {
        id,
      },
    })

    if (!history) {
      ux.error(`History with id '${id}' not found`)
    }

    const alias = withAlias || history.connectionAlias
    const connection = await this.getConnection(alias)

    this.assertConnectionExists(alias, connection)

    const client = new PrismaClient({
      datasourceUrl: connection.connectionString,
    })

    const query = history.query

    try {
      const result = await this.load('Executing query', client.$queryRawUnsafe(query))
      printFormatted(format, result)
      await this.saveHistory(alias, query, true)
    } catch (err) {
      await this.saveHistory(alias, query, false)
      throw err
    }
  }
}
