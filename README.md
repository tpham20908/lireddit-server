## Setting up PostgreSQL

1. Install `postgres` and set up the database

a. Install `postgres`

If you're on MacOS, you can install `postgresql` with `Homebrew` via the command line:

```bash
# install the latest version of postgres
brew install postgresql
```

Verify that postgres is installed:

```bash
which postgresql
```

Let’s go ahead and start Postgres running, and make sure Postgres starts every time your computer starts up. Execute one of the following commands:

```bash
# run postgres once
pg_ctl -D /usr/local/var/postgres start

# or start and always start on boot
brew services start postgresql
```

If you're on Linux or Windows, follow the official installation guide [here](https://www.postgresql.org/download/)

b. Set up user and database

Go to the terminal and start by connecting to postgres interface:

```bash
psql postgres
```

> Here, you're connecting to a database named "postgres" (A default database that postgres created) as a postgres user that postgres has created by default which has the same username as your system user.

You probably see something like this now:

```bash
psql (12.2)
Type "help" for help.

postgres=#
```

Now, tell postgres to show the list of users that it has created:

```sql
postgres=# \du
```

If {user} is not in the list, go ahead and create a new {user} with permission to create DB and log in:

```sql
postgres= CREATE ROLE {user} CREATEDB WITH LOGIN;
-- or add more attributes to ROLE
postgres= ALTER ROLE {user} WITH REPLICATION;
```

Then verify that it's created:

```sql
postgres= \du
```

Create new databases: Example create 3 databases called `wmn001_study`, `wmn001_pii` and `wmn001_multistudy` and assign the newly created {user} to the databases:

```sql
postgres= CREATE DATABASE wmn001_study OWNER {user};
postgres= CREATE DATABASE wmn001_pii OWNER {user};
postgres= CREATE DATABASE wmn001_multistudy OWNER {user};
```

Verify that the databases are indeed created and is owned by `wmnhealth`:

```
# \l is the command to list all databases
postgres= \l
```

You should see this:

```
 Name          |     Owner   | Encoding |   Collate   |    Ctype    |      Access privileges
---------------+-------------+----------+-------------+-------------+----------------------------
 ...
 wmn001_study | {user    | UTF8     | en_CA.UTF-8 | en_CA.UTF-8 |
 wmn001_pii   | {user    | UTF8     | en_CA.UTF-8 | en_CA.UTF-8 |
 wmn001_multistudy | {user    | UTF8     | en_CA.UTF-8 | en_CA.UTF-8 |
```

The database is now ready.

## Watching

```bash
npm run watch
```

## Run migration when new Entity created

```bash
npx mikro-orm migration:create   # Create new migration with current schema diff
npx mikro-orm migration:up       # Migrate up to the latest version
npx mikro-orm migration:down     # Migrate one step down
npx mikro-orm migration:list     # List all executed migrations
npx mikro-orm migration:pending  # List all pending migrations
```

## Run dev

```bash
npm run dev
```
