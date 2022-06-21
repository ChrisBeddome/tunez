# tunez.

tunez. is an ecommerce application built with nextJS and MongoDB.

## Installation

Install [mongodb](https://www.mongodb.com/docs/manual/installation/).

run `npm install` from root directory

create `.env.local` file in the project root directory using the template:

```bash
NEXT_HOSTNAME = localhost
NEXT_PORT = 3000

MONGO_DB_HOSTNAME = 127.0.0.1
MONGO_DB_PORT = 27017
MONGODB_DB = tunez
MONGODB_AUTH_DB = admin
MONGODB_USER = tunezAdmin
MONGODB_PASS = password
MONGODB_CONNECTION_STRING = mongodb://$MONGODB_USER:$MONGODB_PASS@$MONGO_DB_HOSTNAME:$MONGO_DB_PORT/?authSource=$MONGODB_AUTH_DB

```

## Seed Data

```bash
mongorestore -d <db_name> ./data_backups/tunez/ -u <user> -p <password> --authenticationDatabase <authDatabase>
```

## Usage

Ensure mongodb is running (may differ depending on your local environment)
```bash
sudo service mongodb start
```

start the development server

```bash
npm run dev
```

##Data backup

```bash
mongodump -d <db_name> -u <user> -p <password> --authenticationDatabase <authDatabase> -o ./data_backups
```

## License
[MIT](https://choosealicense.com/licenses/mit/)