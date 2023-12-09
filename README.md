# SQLQ

A little CLI for working with databases during development for quick queries and automation

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

<!-- commandsstop -->
