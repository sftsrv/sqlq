import {Command, Flags, ux} from '@oclif/core'
import {Driver, drivers, isDriver, runQuery, sqlqdb} from './database.js'
import {Connection, PrismaClient} from '@prisma/client'
import {Format, outputData} from './output.js'

export abstract class AppCommand extends Command {
  sqlqdb = sqlqdb

  assertConnectionExists(alias: string, connection: Connection | null): asserts connection is Connection {
    if (!connection) {
      ux.error(`Connection with alias '${alias}' not found`)
    }
  }

  saveHistory = (connectionAlias: string, query: string, success: boolean) =>
    this.sqlqdb.history.upsert({
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

  async printQuery(driver: Driver, connectionString: string, query: string, format: Format, file: string | undefined) {
    const result = await runQuery(driver, connectionString, query)
    outputData(format, file, result)

    return result
  }

  async printQueryWithHistory(
    driver: string,
    alias: string,
    connectionString: string,
    query: string,
    format: Format,
    file: string | undefined,
  ) {
    if (!isDriver(driver)) {
      ux.error(`Connection has driver '${driver}' which is not supported`)
    }

    try {
      await this.printQuery(driver, connectionString, query, format, file)
      await this.saveHistory(alias, query, true)
    } catch (err) {
      await this.saveHistory(alias, query, false)
      throw err
    }
  }

  getConnection(alias: string) {
    return this.sqlqdb.connection.findFirst({
      where: {
        alias,
      },
    })
  }
}
