`sqlq tool`
===========

Create a tool

* [`sqlq tool create NAME QUERY [DESCRIPTION]`](#sqlq-tool-create-name-query-description)
* [`sqlq tool delete NAME`](#sqlq-tool-delete-name)
* [`sqlq tool get NAME`](#sqlq-tool-get-name)
* [`sqlq tool list [SEARCH]`](#sqlq-tool-list-search)
* [`sqlq tool ls [SEARCH]`](#sqlq-tool-ls-search)
* [`sqlq tool query ALIAS NAME`](#sqlq-tool-query-alias-name)
* [`sqlq tool update NAME [QUERY] [DESCRIPTION]`](#sqlq-tool-update-name-query-description)

## `sqlq tool create NAME QUERY [DESCRIPTION]`

Create a tool

```
USAGE
  $ sqlq tool create NAME QUERY [DESCRIPTION] [--format js|table|json|csv]

ARGUMENTS
  NAME         Name for the tool
  QUERY        A query that the tool will run. This may contain parameters in the format of $Index that will be
               evaluated when the query runs
  DESCRIPTION  Description for the tool

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|csv>

DESCRIPTION
  Create a tool
```

_See code: [dist/commands/tool/create.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/tool/create.ts)_

## `sqlq tool delete NAME`

Delete a tool

```
USAGE
  $ sqlq tool delete NAME [--format js|table|json|csv]

ARGUMENTS
  NAME  Name of tool to delete

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|csv>

DESCRIPTION
  Delete a tool
```

_See code: [dist/commands/tool/delete.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/tool/delete.ts)_

## `sqlq tool get NAME`

Get a tool

```
USAGE
  $ sqlq tool get NAME [--format js|table|json|csv]

ARGUMENTS
  NAME  Name of tool

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|csv>

DESCRIPTION
  Get a tool
```

_See code: [dist/commands/tool/get.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/tool/get.ts)_

## `sqlq tool list [SEARCH]`

Search tools

```
USAGE
  $ sqlq tool list [SEARCH] [--format js|table|json|csv] [--count <value>]

ARGUMENTS
  SEARCH  Part of a query to search for

FLAGS
  --count=<value>    [default: 20] Maximum number of results to return
  --format=<option>  [default: table]
                     <options: js|table|json|csv>

DESCRIPTION
  Search tools

ALIASES
  $ sqlq tool ls
```

_See code: [dist/commands/tool/list.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/tool/list.ts)_

## `sqlq tool ls [SEARCH]`

Search tools

```
USAGE
  $ sqlq tool ls [SEARCH] [--format js|table|json|csv] [--count <value>]

ARGUMENTS
  SEARCH  Part of a query to search for

FLAGS
  --count=<value>    [default: 20] Maximum number of results to return
  --format=<option>  [default: table]
                     <options: js|table|json|csv>

DESCRIPTION
  Search tools

ALIASES
  $ sqlq tool ls
```

## `sqlq tool query ALIAS NAME`

Use a tool with a connection

```
USAGE
  $ sqlq tool query ALIAS NAME [--format js|table|json|csv] [--params <value>]

ARGUMENTS
  ALIAS  Connection alias to invoke the tool against
  NAME   Name of tool to execute

FLAGS
  --format=<option>    [default: table]
                       <options: js|table|json|csv>
  --params=<value>...  Parameter to use in subcommand

DESCRIPTION
  Use a tool with a connection
```

_See code: [dist/commands/tool/query.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/tool/query.ts)_

## `sqlq tool update NAME [QUERY] [DESCRIPTION]`

Update a tool

```
USAGE
  $ sqlq tool update NAME [QUERY] [DESCRIPTION] [--format js|table|json|csv]

ARGUMENTS
  NAME         Name for the tool
  QUERY        A query that the tool will run. This may contain parameters in the format of $Index that will be
               evaluated when the query runs
  DESCRIPTION  Description for the tool

FLAGS
  --format=<option>  [default: table]
                     <options: js|table|json|csv>

DESCRIPTION
  Update a tool
```

_See code: [dist/commands/tool/update.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/tool/update.ts)_
