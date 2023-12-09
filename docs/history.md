`sqlq history`
==============

Delete a history entry

* [`sqlq history delete ID`](#sqlq-history-delete-id)
* [`sqlq history get ID`](#sqlq-history-get-id)
* [`sqlq history list [SEARCH]`](#sqlq-history-list-search)
* [`sqlq history ls [SEARCH]`](#sqlq-history-ls-search)

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

_See code: [dist/commands/history/delete.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/history/delete.ts)_

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

_See code: [dist/commands/history/get.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/history/get.ts)_

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

_See code: [dist/commands/history/list.ts](https://github.com/nabeelvalley/sqlq/blob/v0.0.0/dist/commands/history/list.ts)_

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
