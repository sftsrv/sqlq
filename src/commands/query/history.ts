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
    confirm: this.confirmFlag,
    withAlias: Flags.string({description: 'Override the initial alias used to run the command', required: false}),
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(SQL)
    const {id} = args
    const {format, withAlias, confirm} = flags

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

    await this.confirmQuery(alias, history.query, confirm)

    await this.executeQuery(alias, connection.connectionString, history.query, format)
  }
}
