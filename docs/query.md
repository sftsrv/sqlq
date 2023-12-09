`sqlq query`
============

Query data from a database by file

* [`sqlq query file ALIAS FILE`](#sqlq-query-file-alias-file)
* [`sqlq query sql ALIAS QUERY`](#sqlq-query-sql-alias-query)

## `sqlq query file ALIAS FILE`

Query data from a database by file

```
USAGE
  $ sqlq query file ALIAS FILE [--format js|table|json|csv]

ARGUMENTS
  ALIAS  Alias for connection
  FILE   Path to file containing SQL query

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|csv>

DESCRIPTION
  Query data from a database by file
```

_See code: [dist/commands/query/file.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/query/file.ts)_

## `sqlq query sql ALIAS QUERY`

Query data from a database

```
USAGE
  $ sqlq query sql ALIAS QUERY [--format js|table|json|csv]

ARGUMENTS
  ALIAS  Alias for connection
  QUERY  Query to run on database

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|csv>

DESCRIPTION
  Query data from a database
```

_See code: [dist/commands/query/sql.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/query/sql.ts)_
