# SQLQ

A little CLI for working with databases during development for quick queries and automation

Install the CLI from NPM using your fave package manager. If you don't have a fave, just use `npm`:

```sh
npm install --global sqlq
```

Then, you should be able to view the application help using:

```sh
sqlq help
```

Which should show you the root help menu:

```txt
Quickly interact with your development databases

VERSION
  sqlq/0.0.2 win32-x64 node-v20.10.0

USAGE
  $ sqlq [COMMAND]

TOPICS
  connection  Create a connection to a database
  history     Delete a history entry
  query       Query data from a database by file
  tool        Create a tool

COMMANDS
  help  Display help for sqlq.
  yeet  Run a query via connection string. Not saved in history.
```

# Usage

The flow for using the application is as follows:

1. Create a connection to a database using `sqlq connection create` and follow the instructions. This stores the database config so you can connect and use it
2. Once you have a connection, you can run queries against it using the `sqlq query sql` or `sqlq query file` subcommands
3. You can also store queries to run by name using the `sqlq tool` subcommand set
4. The application stores previous queries which can be accessed using `sqlq history`. You can repeat these queries using their ID with `sqlq query history`

# Supported Databases

Currently the application supports:

1. SQLite
   - Connection String as pth to the DB File: `./mydatabase.db`. Relative paths may be used but will be resolved from the current directory
2. PostgreSQL
   - Connection String in Postgres format: `postgres://username:password@hostname:PORT/databasename`
3. Microsoft SQL Server
   - Connection String in SQL Server Format: `Server=hostname:PORT;Database=databasename;User Id=username;Password=password;Trusted_Connection=True;`. Can also add `Encrypt=False;` to the end for working with dbs

> Contributions welcome for additional database support

# Goals

- [x] Manage list of connections
- [x] Manage list of common queries with an alias
- [x] Manage/migrate own internal DB in the real app (TBC, should work)
- [x] Support different output formats, e.g. CSV/JSON/Table View

# Maybe to do

- [ ] Creation of DB instances on the user's machine - SQLite? PG? Docker?
- [ ] Run a parameterized query using a CSV for multiple inputs?

# Commands

<!-- commands -->
* [`sqlq conn create DRIVER ALIAS CONNECTIONSTRING [DESCRIPTION]`](#sqlq-conn-create-driver-alias-connectionstring-description)
* [`sqlq conn delete ALIAS`](#sqlq-conn-delete-alias)
* [`sqlq conn get ALIAS`](#sqlq-conn-get-alias)
* [`sqlq conn ls [SEARCH]`](#sqlq-conn-ls-search)
* [`sqlq connection create DRIVER ALIAS CONNECTIONSTRING [DESCRIPTION]`](#sqlq-connection-create-driver-alias-connectionstring-description)
* [`sqlq connection delete ALIAS`](#sqlq-connection-delete-alias)
* [`sqlq connection get ALIAS`](#sqlq-connection-get-alias)
* [`sqlq connection list [SEARCH]`](#sqlq-connection-list-search)
* [`sqlq connection ls [SEARCH]`](#sqlq-connection-ls-search)
* [`sqlq connection update ALIAS CONNECTIONSTRING [DESCRIPTION]`](#sqlq-connection-update-alias-connectionstring-description)
* [`sqlq help [COMMANDS]`](#sqlq-help-commands)
* [`sqlq history delete ID`](#sqlq-history-delete-id)
* [`sqlq history get ID`](#sqlq-history-get-id)
* [`sqlq history list [SEARCH]`](#sqlq-history-list-search)
* [`sqlq history ls [SEARCH]`](#sqlq-history-ls-search)
* [`sqlq query file ALIAS FILE`](#sqlq-query-file-alias-file)
* [`sqlq query history ID`](#sqlq-query-history-id)
* [`sqlq query sql ALIAS QUERY`](#sqlq-query-sql-alias-query)
* [`sqlq query tool ALIAS NAME`](#sqlq-query-tool-alias-name)
* [`sqlq tool create NAME QUERY [DESCRIPTION]`](#sqlq-tool-create-name-query-description)
* [`sqlq tool delete NAME`](#sqlq-tool-delete-name)
* [`sqlq tool get NAME`](#sqlq-tool-get-name)
* [`sqlq tool list [SEARCH]`](#sqlq-tool-list-search)
* [`sqlq tool ls [SEARCH]`](#sqlq-tool-ls-search)
* [`sqlq tool update NAME [QUERY] [DESCRIPTION]`](#sqlq-tool-update-name-query-description)
* [`sqlq yeet DRIVER CONNECTIONSTRING QUERY`](#sqlq-yeet-driver-connectionstring-query)

## `sqlq conn create DRIVER ALIAS CONNECTIONSTRING [DESCRIPTION]`

Create a connection to a database

```
USAGE
  $ sqlq conn create DRIVER ALIAS CONNECTIONSTRING [DESCRIPTION] [--format js|table|json|yml|yaml|csv|ssv]
    [--outfile <value>]

ARGUMENTS
  DRIVER            (mssql|sqlite|pg) The type of driver to use when working to the database
  ALIAS             Alias for connection
  CONNECTIONSTRING  Connection string for database
  DESCRIPTION       Description of connection

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Create a connection to a database

ALIASES
  $ sqlq conn create

EXAMPLES
  $ sqlq connection create sqlite my-sqlite-db /path/to/file.db

  $ sqlq connection create pg postgres://username:password@hostname:PORT/databasename

  $ sqlq connection create mssql Server=hostname:PORT;Database=databasename;User Id=username;Password=password;Trusted_Connection=True;
```

## `sqlq conn delete ALIAS`

Delete a connection

```
USAGE
  $ sqlq conn delete ALIAS [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  ALIAS  Alias of connection to delete

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Delete a connection

ALIASES
  $ sqlq conn delete
```

## `sqlq conn get ALIAS`

Get connection

```
USAGE
  $ sqlq conn get ALIAS [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  ALIAS  Alias for connection

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Get connection

ALIASES
  $ sqlq conn get
```

## `sqlq conn ls [SEARCH]`

List all saved connections

```
USAGE
  $ sqlq conn ls [SEARCH] [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  SEARCH  Search for a connection by alias, description, or conection string

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  List all saved connections

ALIASES
  $ sqlq connection ls
  $ sqlq conn ls
```

## `sqlq connection create DRIVER ALIAS CONNECTIONSTRING [DESCRIPTION]`

Create a connection to a database

```
USAGE
  $ sqlq connection create DRIVER ALIAS CONNECTIONSTRING [DESCRIPTION] [--format js|table|json|yml|yaml|csv|ssv]
    [--outfile <value>]

ARGUMENTS
  DRIVER            (mssql|sqlite|pg) The type of driver to use when working to the database
  ALIAS             Alias for connection
  CONNECTIONSTRING  Connection string for database
  DESCRIPTION       Description of connection

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Create a connection to a database

ALIASES
  $ sqlq conn create

EXAMPLES
  $ sqlq connection create sqlite my-sqlite-db /path/to/file.db

  $ sqlq connection create pg postgres://username:password@hostname:PORT/databasename

  $ sqlq connection create mssql Server=hostname:PORT;Database=databasename;User Id=username;Password=password;Trusted_Connection=True;
```

_See code: [src/commands/connection/create.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/connection/create.ts)_

## `sqlq connection delete ALIAS`

Delete a connection

```
USAGE
  $ sqlq connection delete ALIAS [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  ALIAS  Alias of connection to delete

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Delete a connection

ALIASES
  $ sqlq conn delete
```

_See code: [src/commands/connection/delete.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/connection/delete.ts)_

## `sqlq connection get ALIAS`

Get connection

```
USAGE
  $ sqlq connection get ALIAS [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  ALIAS  Alias for connection

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Get connection

ALIASES
  $ sqlq conn get
```

_See code: [src/commands/connection/get.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/connection/get.ts)_

## `sqlq connection list [SEARCH]`

List all saved connections

```
USAGE
  $ sqlq connection list [SEARCH] [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  SEARCH  Search for a connection by alias, description, or conection string

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  List all saved connections

ALIASES
  $ sqlq connection ls
  $ sqlq conn ls
```

_See code: [src/commands/connection/list.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/connection/list.ts)_

## `sqlq connection ls [SEARCH]`

List all saved connections

```
USAGE
  $ sqlq connection ls [SEARCH] [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  SEARCH  Search for a connection by alias, description, or conection string

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  List all saved connections

ALIASES
  $ sqlq connection ls
  $ sqlq conn ls
```

## `sqlq connection update ALIAS CONNECTIONSTRING [DESCRIPTION]`

Update a connection

```
USAGE
  $ sqlq connection update ALIAS CONNECTIONSTRING [DESCRIPTION] [--format js|table|json|yml|yaml|csv|ssv] [--outfile
    <value>]

ARGUMENTS
  ALIAS             Alias for connection
  CONNECTIONSTRING  Connection string for database
  DESCRIPTION       Description of connection

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Update a connection
```

_See code: [src/commands/connection/update.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/connection/update.ts)_

## `sqlq help [COMMANDS]`

Display help for sqlq.

```
USAGE
  $ sqlq help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for sqlq.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.20/src/commands/help.ts)_

## `sqlq history delete ID`

Delete a history entry

```
USAGE
  $ sqlq history delete ID [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  ID  ID of history entry to delete

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Delete a history entry
```

_See code: [src/commands/history/delete.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/history/delete.ts)_

## `sqlq history get ID`

Get a history entry

```
USAGE
  $ sqlq history get ID [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  ID  ID of history entry

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Get a history entry
```

_See code: [src/commands/history/get.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/history/get.ts)_

## `sqlq history list [SEARCH]`

Search query history

```
USAGE
  $ sqlq history list [SEARCH] [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>] [--alias <value>]
    [--aliasExact] [--count <value>]

ARGUMENTS
  SEARCH  Part of a query to search for

FLAGS
  --alias=<value>    Alias for connection
  --aliasExact       If alias should match exactly
  --count=<value>    [default: 20] Maximum number of results to return
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Search query history

ALIASES
  $ sqlq history ls
```

_See code: [src/commands/history/list.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/history/list.ts)_

## `sqlq history ls [SEARCH]`

Search query history

```
USAGE
  $ sqlq history ls [SEARCH] [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>] [--alias <value>]
    [--aliasExact] [--count <value>]

ARGUMENTS
  SEARCH  Part of a query to search for

FLAGS
  --alias=<value>    Alias for connection
  --aliasExact       If alias should match exactly
  --count=<value>    [default: 20] Maximum number of results to return
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Search query history

ALIASES
  $ sqlq history ls
```

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

_See code: [src/commands/query/file.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/query/file.ts)_

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

_See code: [src/commands/query/history.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/query/history.ts)_

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

_See code: [src/commands/query/sql.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/query/sql.ts)_

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

_See code: [src/commands/query/tool.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/query/tool.ts)_

## `sqlq tool create NAME QUERY [DESCRIPTION]`

Create a tool

```
USAGE
  $ sqlq tool create NAME QUERY [DESCRIPTION] [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  NAME         Name for the tool
  QUERY        A query that the tool will run. This may contain parameters in the format of $Index that will be
               evaluated when the query runs
  DESCRIPTION  Description for the tool

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Create a tool
```

_See code: [src/commands/tool/create.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/tool/create.ts)_

## `sqlq tool delete NAME`

Delete a tool

```
USAGE
  $ sqlq tool delete NAME [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  NAME  Name of tool to delete

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Delete a tool
```

_See code: [src/commands/tool/delete.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/tool/delete.ts)_

## `sqlq tool get NAME`

Get a tool

```
USAGE
  $ sqlq tool get NAME [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  NAME  Name of tool

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Get a tool
```

_See code: [src/commands/tool/get.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/tool/get.ts)_

## `sqlq tool list [SEARCH]`

Search tools

```
USAGE
  $ sqlq tool list [SEARCH] [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>] [--count <value>]

ARGUMENTS
  SEARCH  Part of a query to search for

FLAGS
  --count=<value>    [default: 20] Maximum number of results to return
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Search tools

ALIASES
  $ sqlq tool ls
```

_See code: [src/commands/tool/list.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/tool/list.ts)_

## `sqlq tool ls [SEARCH]`

Search tools

```
USAGE
  $ sqlq tool ls [SEARCH] [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>] [--count <value>]

ARGUMENTS
  SEARCH  Part of a query to search for

FLAGS
  --count=<value>    [default: 20] Maximum number of results to return
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Search tools

ALIASES
  $ sqlq tool ls
```

## `sqlq tool update NAME [QUERY] [DESCRIPTION]`

Update a tool

```
USAGE
  $ sqlq tool update NAME [QUERY] [DESCRIPTION] [--format js|table|json|yml|yaml|csv|ssv] [--outfile <value>]

ARGUMENTS
  NAME         Name for the tool
  QUERY        A query that the tool will run. This may contain parameters in the format of $Index that will be
               evaluated when the query runs
  DESCRIPTION  Description for the tool

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|yml|yaml|csv|ssv>
  --outfile=<value>  Print output to file

DESCRIPTION
  Update a tool
```

_See code: [src/commands/tool/update.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/tool/update.ts)_

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

_See code: [src/commands/yeet.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.3/src/commands/yeet.ts)_
<!-- commandsstop -->
