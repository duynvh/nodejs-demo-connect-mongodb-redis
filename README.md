# Use examples

First of all run npm install
You can start a example by using ts-node

```
$ npm install -g ts-node
$ npm start
```

Or using docker

```
$ docker-compose up -d
```

This will start up the server and you can use the exam
To run all tests simply run `npm run test:all`

### 1. API return list users (list is fixed)

```sh
curl --location --request GET 'http://localhost:3000/users'
```

### 2. API convert name to account

```sh
curl --location --request POST 'http://localhost:3000/users/convert-name' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "  Hoàng    Trọng    Đức Hiếu"
}'
```

### 3. API get total days in month

```sh
curl --location --request GET 'http://localhost:3000/time/total-days-in-month/2020-10'
```

### 4. API get day in week

```sh
curl --location --request GET 'http://localhost:3000/time/days-in-week/2022-04-13'
```
