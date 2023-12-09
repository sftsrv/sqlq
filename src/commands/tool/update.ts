import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, printFormatted} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class Create extends AppCommand {
  static args = {
    name: Args.string({description: 'Name for the tool', required: true}),
    query: Args.string({
      description:
        'A query that the tool will run. This may contain parameters in the format of $Index that will be evaluated when the query runs',
      required: false,
    }),
    description: Args.string({
      description: 'Description for the tool',
      required: false,
    }),
  }

  static description = 'Update a tool'

  static examples = []

  static flags = {
    format,
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Create)
    const {name, query, description} = args
    const {format} = flags

    const result = await this.sqlqdb.tool.update({
      where: {
        name,
      },
      data: {
        query,
        description,
        updated: new Date(),
      },
    })

    printFormatted(format, result)
  }
}
