import {Args, Command, Flags, ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import {format, outfile, outputData} from '../../output.js'
import {drivers, sqlqdb} from '../../database.js'
import {AppCommand} from '../../AppCommand.js'

export default class Create extends AppCommand {
  static args = {
    driver: Args.string({
      description: 'The type of driver to use when working to the database',
      required: true,
      options: drivers,
    }),
    alias: Args.string({description: 'Alias for connection', required: true}),
    connectionString: Args.string({description: 'Connection string for database', required: true}),
    description: Args.string({description: 'Description of connection', required: false}),
  }

  static description = 'Create a connection to a database'

  static examples = [
    `sqlq connection create sqlite my-sqlite-db /path/to/file.db`,
    `sqlq connection create pg postgres://username:password@hostname:PORT/databasename`,
    `sqlq connection create mssql Server=hostname:PORT;Database=databasename;User Id=username;Password=password;Trusted_Connection=True;`,
  ]

  static aliases = ['conn:create']

  static flags = {
    format,
    outfile,
  }

  async run(): Promise<any> {
    const {args, flags} = await this.parse(Create)
    const {alias, driver, connectionString, description} = args
    const {format, outfile} = flags

    const connection = await this.sqlqdb.connection.findFirst({
      where: {
        alias,
      },
    })

    if (connection) {
      ux.error(`Connection with alias ${alias} already exists`)
    }

    const result = await this.sqlqdb.connection.create({
      data: {
        alias,
        connectionString,
        description,
        driver,
      },
    })

    outputData(format, outfile, result)
  }
}
