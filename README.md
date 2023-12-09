# SQLQ

A little CLI for working with databases during development for quick queries and automation

# Usage

Install the CLI from NPM using your fave package manager. If you don't have a fave, just use `npm`:

```sh
npm install --global sqlq
```

Then, you should be able to view the application help using:

```sh
sqlq help
```

The flow for using the application is as follows:

1. Create a connection to a database using `sqlq connection create` and follow the instructions. This stores the database config so you can connect and use it
2. Once you have a connection, you can run queries against it using the `sqlq query sql` or `sqlq query file` subcommands
3. You can also store queries to run by name using the `sqlq tool` subcommand set
4. The application stores previous queries which can be accessed using `sqlq history`. You can repeat these queries using their ID with `sqlq query history`

# Supported Databases

Currently the application should work fine with:

1. SQLite
2. PostgreSQL
3. Microsoft SQL Server

> Contributions welcome for additional database support

# Goals

- [x] Manage list of connections
- [x] Manage list of common queries with an alias
- [x] Manage/migrate own internal DB in the real app (TBC, should work)
- [x] Support different output formats, e.g. CSV/JSON/Table View

# Maybe to do

- [ ] Creation of DB instances on the user's machine - SQLite? PG? Docker?
- [ ] Run a parameterized query using a CSV for multiple inputs?

<!-- commands -->

# Command Topics

- [`sqlq connection`](docs/connection.md) - Create a connection to a database
- [`sqlq help`](docs/help.md) - Display help for sqlq.
- [`sqlq history`](docs/history.md) - Delete a history entry
- [`sqlq query`](docs/query.md) - Query data from a database by file
- [`sqlq tool`](docs/tool.md) - Create a tool
- [`sqlq yeet`](docs/yeet.md) - Run a query via connection string. Not saved in history.

<!-- commandsstop -->
