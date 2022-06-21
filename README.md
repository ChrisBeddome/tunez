# tunez.

tunez. is an ecommerce application built with nextJS and MongoDB.

## Installation

Install [mongodb](https://www.mongodb.com/docs/manual/installation/).

run `npm install` from root directory

create `.env.local` file in the project root directory using the template:

```bash
HOSTNAME = localhost
PORT = 3000

MONGODB_URI = mongodb://127.0.0.1:27017
MONGODB_DB = tunez
MONGODB_USER = tunez_user
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