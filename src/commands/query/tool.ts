import {Args, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {AppCommand} from '../../AppCommand.js'

export default class Tool extends AppCommand {
  static args = {
    alias: Args.string({description: 'Connection alias to invoke the tool against', required: true}),
    name: Args.string({description: 'Name of tool to execute', required: true}),
  }

  static description = 'Use a tool with a connection'

  static examples = []

  static aliases = ['history:query']

  static flags = {
    format,
    confirm: this.confirmFlag,
    params: Flags.string({
      multiple: true,
      aliases: ['p'],
      description: 'Parameter to use in subcommand',
    }),
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Tool)
    const {alias, name} = args
    const {format, confirm, params} = flags

    const [connection, tool] = await Promise.all([
      this.getConnection(alias),
      this.db.tool.findFirst({
        where: {
          name,
        },
      }),
    ])

    if (!tool) {
      ux.error(`Tool with name '${name}' not found`)
    }

    this.assertConnectionExists(alias, connection)

    const query = buildQuery(tool.query, params)

    await this.confirmQuery(alias, query, confirm)

    await this.executeQuery(connection.driver, alias, connection.connectionString, query, format)

    await this.db.tool.update({
      where: {
        name,
      },
      data: {
        count: {
          increment: 1,
        },
        lastUsed: new Date(),
      },
    })
  }
}
function buildQuery(query: string, params: string[] = []) {
  return params.reduce((acc, param, i) => acc.replaceAll('$' + i, param), query)
}
