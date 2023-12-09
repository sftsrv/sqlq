import {Flags, ux} from '@oclif/core'
import {OptionFlag} from '@oclif/core/lib/interfaces/index.js'
import {writeFile} from 'fs/promises'
import {json2csv as csv} from 'json-2-csv'
import * as yaml from 'yaml'

const formats = ['js', 'table', 'json', 'yml', 'yaml', 'csv', 'ssv'] as const

export type Format = (typeof formats)[number]

const stdout: Record<Format, (data: unknown) => void> = {
  js: (data: unknown) => console.log(data),
  table: (data: unknown) => console.table(data),
  json: (data: unknown) => console.log(JSON.stringify(data, null, 2)),
  yml: (data: unknown) => console.log(yaml.stringify(data)),
  yaml: (data: unknown) => console.log(yaml.stringify(data)),
  csv: (data: unknown) => console.log(csv(data instanceof Array ? data : [data])),
  ssv: (data: unknown) =>
    console.log(
      csv(data instanceof Array ? data : [data], {
        delimiter: {
          field: ' ',
        },
      }),
    ),
} as const

const content: Record<Format, (data: unknown) => string> = {
  js: (data: unknown) => JSON.stringify(data),
  table: (data: unknown) => JSON.stringify(data),
  json: (data: unknown) => JSON.stringify(data, null, 2),
  yml: (data: unknown) => yaml.stringify(data),
  yaml: (data: unknown) => yaml.stringify(data),
  csv: (data: unknown) => csv(data instanceof Array ? data : [data]),
  ssv: (data: unknown) =>
    csv(data instanceof Array ? data : [data], {
      delimiter: {
        field: ' ',
      },
    }),
} as const

/**
 * Print data to stdout or a file depending on what's needed
 */
export const outputData = async (format: Format = 'table', file: string | undefined, value: any) => {
  if (file) {
    const text = content[format](value)
    await writeFile(file, text, 'utf-8')
    console.log(`Data written to ${file}`)
  } else {
    stdout[format](value)
  }
}

export const outfile = Flags.file({
  description: 'Print output to file',
  required: false,
})

export const format = Flags.string({
  options: formats,
  default: 'table',
}) as OptionFlag<Format>
