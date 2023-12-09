`sqlq yeet`
===========

Run a query via connection string. Not saved in history.

* [`sqlq yeet DRIVER CONNECTIONSTRING QUERY`](#sqlq-yeet-driver-connectionstring-query)

## `sqlq yeet DRIVER CONNECTIONSTRING QUERY`

Run a query via connection string. Not saved in history.

```
USAGE
  $ sqlq yeet DRIVER CONNECTIONSTRING QUERY [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  DRIVER            (mssql|sqlite|pg) Database driver to use
  CONNECTIONSTRING  Connection String
  QUERY             Query to run on database

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Run a query via connection string. Not saved in history.
```

_See code: [dist/commands/yeet.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/yeet.ts)_
