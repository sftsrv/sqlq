`sqlq connection`
=================

Create a connection to a database

* [`sqlq connection create ALIAS DRIVER CONNECTIONSTRING [DESCRIPTION]`](#sqlq-connection-create-alias-driver-connectionstring-description)
* [`sqlq connection delete ALIAS`](#sqlq-connection-delete-alias)
* [`sqlq connection get ALIAS`](#sqlq-connection-get-alias)
* [`sqlq connection list [SEARCH]`](#sqlq-connection-list-search)
* [`sqlq connection ls [SEARCH]`](#sqlq-connection-ls-search)

## `sqlq connection create ALIAS DRIVER CONNECTIONSTRING [DESCRIPTION]`

Create a connection to a database

```
USAGE
  $ sqlq connection create ALIAS DRIVER CONNECTIONSTRING [DESCRIPTION] [--format js|table|json|yml|yaml|csv|ssv]
    [--outfile <value>]

ARGUMENTS
  ALIAS             Alias for connection
  DRIVER            (mssql|sqlite|pg) The type of driver to use when working to the database
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
```

_See code: [dist/commands/connection/create.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/connection/create.ts)_

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

_See code: [dist/commands/connection/delete.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/connection/delete.ts)_

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

_See code: [dist/commands/connection/get.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/connection/get.ts)_

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

_See code: [dist/commands/connection/list.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/connection/list.ts)_

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
