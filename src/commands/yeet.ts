import {Args} from '@oclif/core'
import {AppCommand} from '../AppCommand.js'
import {format} from '../output.js'
import {assertDriver, drivers} from '../database.js'

export default class Yeet extends AppCommand {
  static args = {
    driver: Args.string({description: 'Database driver to use', required: true, options: drivers}),
    connectionString: Args.string({description: 'Connection String', required: true}),
    query: Args.string({description: 'Query to run on database', required: true}),
  }

  static description = 'Run a query via connection string. Not saved in history.'

  static examples = []

  static flags = {
    format,
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Yeet)
    const {connectionString, query, driver} = args
    const {format} = flags

    assertDriver(driver)

    await this.printQuery(driver, connectionString, query, format)
  }
}
