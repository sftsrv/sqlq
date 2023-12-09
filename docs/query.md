`sqlq query`
============

Query data from a database by file

* [`sqlq query file ALIAS FILE`](#sqlq-query-file-alias-file)
* [`sqlq query history ID`](#sqlq-query-history-id)
* [`sqlq query sql ALIAS QUERY`](#sqlq-query-sql-alias-query)
* [`sqlq query tool ALIAS NAME`](#sqlq-query-tool-alias-name)

## `sqlq query file ALIAS FILE`

Query data from a database by file

```
USAGE
  $ sqlq query file ALIAS FILE [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  ALIAS  Alias for connection
  FILE   Path to file containing SQL query

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Query data from a database by file
```

_See code: [dist/commands/query/file.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/query/file.ts)_

## `sqlq query history ID`

Re-run a previous database query

```
USAGE
  $ sqlq query history ID [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>] [--withAlias <value>]

ARGUMENTS
  ID  ID of history entry to execute

FLAGS
  --format=<option>    [default: table]
                       <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>    Print output to file
  --withAlias=<value>  Override the initial alias used to run the command

DESCRIPTION
  Re-run a previous database query
```

_See code: [dist/commands/query/history.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/query/history.ts)_

## `sqlq query sql ALIAS QUERY`

Query data from a database

```
USAGE
  $ sqlq query sql ALIAS QUERY [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  ALIAS  Alias for connection
  QUERY  Query to run on database

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Query data from a database
```

_See code: [dist/commands/query/sql.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/query/sql.ts)_

## `sqlq query tool ALIAS NAME`

Use a tool with a connection

```
USAGE
  $ sqlq query tool ALIAS NAME [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>] [--params <value>]

ARGUMENTS
  ALIAS  Connection alias to invoke the tool against
  NAME   Name of tool to execute

FLAGS
  --format=<option>    [default: table]
                       <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>    Print output to file
  --params=<value>...  Parameter to use in subcommand

DESCRIPTION
  Use a tool with a connection
```

_See code: [dist/commands/query/tool.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/query/tool.ts)_
