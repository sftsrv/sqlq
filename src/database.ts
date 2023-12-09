import {PrismaClient} from '@prisma/client'
import MSSQL from 'mssql'
import PG from 'pg'

export const sqlqdb = new PrismaClient()

type QueryHandler = (connectionString: string, query: string) => Promise<any>

const sqlite: QueryHandler = (connectionString, query) => {
  const client = new PrismaClient({
    datasourceUrl: connectionString,
  })

  return client.$queryRawUnsafe(query)
}

const mssql: QueryHandler = async (connectionString, query) => {
  const client = await MSSQL.connect(connectionString)
  try {
    const result = await MSSQL.query(query)
    await client.close()
    return result.output
  } catch (err) {
    await client.close()
    throw err
  }
}

const pg: QueryHandler = async (connectionString, query) => {
  const client = new PG.Client(connectionString)
  try {
    await client.connect()
    const result = await client.query(query)
    await client.end()
    return result.rows
  } catch (err) {
    await client.end()
    throw err
  }
}

export const driver = {
  mssql: 'mssql',
  sqlite: 'sqlite',
  pg: 'pg',
} as const

type Driver = keyof typeof driver

const handlers: Record<Driver, QueryHandler> = {
  mssql,
  sqlite,
  pg,
}

export const isDriver = (str: string): str is Driver => str in driver

export const drivers = Object.keys(driver)

export const runQuery = (driver: Driver, connectionString: string, query: string) =>
  handlers[driver](connectionString, query)
