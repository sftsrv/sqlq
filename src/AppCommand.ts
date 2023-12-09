import {Command, ux} from '@oclif/core'
import {sqlqdb} from './database.js'
import {Connection} from '@prisma/client'

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
