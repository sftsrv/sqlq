import {ux} from '@oclif/core'
import {PrismaClient} from '@prisma/client'
import MSSQL from 'mssql'
import PG from 'pg'
import * as SQLite from 'sqlite'
import SQLite3 from 'sqlite3'

export const sqlqdb = new PrismaClient()

type QueryHandler = (connectionString: string, query: string) => Promise<any>

const sqlite: QueryHandler = async (connectionString, query) => {
  const client = await SQLite.open({
    filename: connectionString,
    driver: SQLite3.Database,
  })

  try {
    const result = await client.all(query)
    return result
  } catch (err) {
    await client.close()
    throw err
  }
}

const mssql: QueryHandler = async (connectionString, query) => {
  const client = await MSSQL.connect(connectionString)
  try {
    const result = await MSSQL.query(query)
    client.close()
    return result.output
  } catch (err) {
    client.close()
    throw err
  }
}

const pg: QueryHandler = async (connectionString, query) => {
  const client = new PG.Client(connectionString)
  try {
    await client.connect()
    const result = await client.query(query)
    client.end()
    return result.rows
  } catch (err) {
    client.end()
    throw err
  }
}

export const driver = {
  mssql: 'mssql',
  sqlite: 'sqlite',
  pg: 'pg',
} as const

export type Driver = keyof typeof driver

const handlers: Record<Driver, QueryHandler> = {
  mssql,
  sqlite,
  pg,
}

export const isDriver = (str: string): str is Driver => str in driver

export function assertDriver(str: string): asserts str is Driver {
  if (isDriver(str)) {
    return
  }

  ux.error(`Invalid driver provided '${str}'`)
}

export const drivers = Object.keys(driver)

export const runQuery = (driver: Driver, connectionString: string, query: string) =>
  handlers[driver](connectionString, query)
