import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, outfile, outputData} from '../../output.js'
import {sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class Delete extends AppCommand {
  static args = {
    id: Args.integer({description: 'ID of history entry to delete', required: true}),
  }

  static description = 'Delete a history entry'

  static examples = []

  static flags = {
    format,
    outfile,
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Delete)
    const {id} = args
    const {format, outfile} = flags

    const result = await this.sqlqdb.history.delete({
      where: {
        id,
      },
    })

    outputData(format, outfile, result)
  }
}
