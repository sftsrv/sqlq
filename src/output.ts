import {Flags, ux} from '@oclif/core'
import {OptionFlag} from '@oclif/core/lib/interfaces/index.js'

const printers = {
  js: (data: unknown) => console.log(data),
  table: (data: unknown) => console.table(data),
  json: (data: unknown) => console.log(JSON.stringify(data, null, 2)),
  csv: (data: unknown) => console.log(JSON.stringify(data, null, 2)),
} as const

type Format = keyof typeof printers

const formats = Object.keys(printers) as Format[]

export const printFormatted = (format: Format = 'table', value: any) => printers[format](value)

export const format = Flags.string({
  options: formats,
  default: 'table',
}) as OptionFlag<Format>
