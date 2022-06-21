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
MONGODB_URI = mongodb://$MONGO_DB_HOSTNAME:$MONGO_DB_PORT
MONGODB_DB = tunez
MONGODB_USER = tunezAdmin
MONGODB_PASS = password
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

## License
[MIT](https://choosealicense.com/licenses/mit/)