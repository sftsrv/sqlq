import {Command, Flags, ux} from '@oclif/core'
import {drivers, isDriver, runQuery, sqlqdb} from './database.js'
import {Connection, PrismaClient} from '@prisma/client'
import {Format, printFormatted} from './output.js'

export abstract class AppCommand extends Command {
  db = sqlqdb

  async load<T>(start: string, task: Promise<T>, stop?: string) {
    ux.action.start(start)
    const result = await task
    ux.action.stop(stop)

    return result
  }

  assertConnectionExists(alias: string, connection: Connection | null): asserts connection is Connection {
    if (!connection) {
      ux.error(`Connection with alias '${alias}' not found`)
    }
  }

  saveHistory = (connectionAlias: string, query: string, success: boolean) =>
    this.db.history.upsert({
      update: {
        lastUsed: new Date(),
        count: {
          increment: 1,
        },
      },
      create: {
        query,
        success,
        lastUsed: new Date(),
        connectionAlias,
        count: 1,
      },
      where: {
        query_connectionAlias: {
          connectionAlias,
          query,
        },
      },
    })

  static confirmFlag = Flags.boolean({
    description: 'Bypass query confirmation',
    aliases: ['y'],
  })

  async executeQuery(driver: string, alias: string, connectionString: string, query: string, format: Format) {
    if (!isDriver(driver)) {
      ux.error(`Connection has driver '${driver}' which is not supported`)
    }

    try {
      const result = await runQuery(driver, connectionString, query)
      console.log('here', result)
      // const result = await this.load('Executing query', task)
      printFormatted(format, result)
      await this.saveHistory(alias, query, true)
    } catch (err) {
      await this.saveHistory(alias, query, false)
      throw err
    }
  }

  async confirmQuery(alias: string, query: string, skip: boolean) {
    const message = `Execute on ${alias}: \n  ${query}`
    if (skip) {
      console.log(message)
      return
    }

    const isConfirmed = await ux.confirm(message)
    if (!isConfirmed) {
      ux.error('Execution cancelled')
    }
  }

  getConnection(alias: string) {
    return this.load(
      `Getting connection details for '${alias}'`,
      this.db.connection.findFirst({
        where: {
          alias,
        },
      }),
    )
  }
}
