import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, outfile, outputData} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class Delete extends AppCommand {
  static args = {
    name: Args.string({description: 'Name of tool to delete', required: true}),
  }

  static description = 'Delete a tool'

  static examples = []

  static flags = {
    format,
    outfile,
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Delete)
    const {name} = args
    const {format, outfile} = flags

    const result = await this.sqlqdb.tool.delete({
      where: {
        name,
      },
    })

    outputData(format, outfile, result)
  }
}
