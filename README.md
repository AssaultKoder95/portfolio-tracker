# portfolio-tracker

A demo backend application to create portfolio tracker

## Installation

To install, simply clone this repository & run the following command `yarn install`, this will install all the dependencies for you.

## Running project

To run this project locally, run the following command `yarn start`, this will start a local instance of the application & you will be able to send API requests.

Alternatively, an easier way is to run this the postman collection, no setups, no hassles.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/94e5460c770f01bda6ce#?env%5BProduction%5D=W3sia2V5IjoiYXBpX2Jhc2VfdXJsIiwidmFsdWUiOiJodHRwczovL3BvcnRmb2xpby10cmFja2VyLWRlbW8uaGVyb2t1YXBwLmNvbSIsImVuYWJsZWQiOnRydWV9XQ==)

### Heroku Deployment

This project is addtionally deployed on [Heroku](https://portfolio-tracker-demo.herokuapp.com/) 

## API Routes

Current implementation has 6 routes namely:

- Add Trade
- Update Trade
- Delete Trade
- Get User Portfolio
- Get User Holdings
- Get User Returns Data

_Note: In case you get errors while making API requests, there is requestId present in response headers with header value `x-sm-requestId`. Kindly raise a ticket with that requestId for faster resolution of the query._

The above mentioned routes are explained below:

### Add Trade

This API endpoint extends the functionality of adding a trade associated with an user account.

#### Attributes

This endpoint expects the following attributes passed as a JSON body along the request:

- orderType: A string type value that can either be buy or sell.
- quantity: A number type value that should be greater than zero.
- price: A number type value that should be greater than zero.
- symbol: A string type value that represents the share symbol.
- userId: A string type value that represents the user id.

#### Return value

On successful completion, the response will contain a JSON with the following attributes:

- tradeId: An unique identifier for the trade.
- orderType: A string type value that can either be buy or sell.
- quantity: A number type value that should be greater than zero.
- price: A number type value that should be greater than zero.
- symbol: A string type value that represents the share symbol.
- userId: A string type value that represents the user id.
- timestamp: A timestamp to denote the execution time of the trade.

On failure, API responses & appropriate messages will be passed due to one of the following cases:

- Status Code: 400 
  - If any of the values is missing or is invalid. 
  - If no associated user account is found ( sell order type case only ) 
  - If sell quantity is greater than or equal to that of quantity present in user account ( sell order type case only )

- Status Code: 500
  - Internal server error

#### Sample Request & Response

**Request**

```bash
curl --location --request POST '<BASE API ENDPOINT>/trade' \
--header 'Content-Type: application/json' \
--data-raw '{
    "orderType": "buy",
    "symbol": "MSFT",
    "quantity": 100,
    "price": 10,
    "userId": "1"
}'
```

**Response**

```json
{
  "userId": "userId",
  "quantity": 100,
  "symbol": "MSFT",
  "price": 10,
  "orderType": "BUY",
  "tradeId": "tradeId",
  "timestamp": "2020-01-01T080:00:00.000Z"
}
```

**Postman Implementation**

![Add Trade Example](https://ik.imagekit.io/lemonbouy/example-add-trade_c43hQYq0t.png)

### Update Trade

This API endpoint extends the functionality of updating a trade associated with an user account.

#### Attributes

This endpoint expects the following attributes passed as a:

- Path params

  - userId: The value that represents the user id.
  - tradeId: The value that represents associated trade.

- JSON body along the request
  - price: A number type value that should be greater than zero. ( optional )
  - quantity: A number type value that should be greater than zero. ( optional )

#### Return value

On successful completion, the response will contain a 204, indicating that the update was successful.

On failure, API responses & appropriate messages will be passed due to one of the following cases:

- Status Code: 400 
  - If any of the values is missing or is invalid. 
  - If no matching trade is found.

- Status Code: 500
  - Internal server error

#### Sample Request & Response

**Request**

```bash
curl --location --request PUT '<BASE API ENDPOINT>/trade/userId/tradeId' \
--header 'Content-Type: application/json' \
--data-raw '{
    "price": 10,
    "quantity":  5
}'
```

**Response**

API response status code is 204.

**Postman Implementation**

![Update Trade Example](https://ik.imagekit.io/lemonbouy/example-update-trade_M0BnXjHKM.png)

### Delete Trade

This API endpoint extends the functionality of deleting a trade associated with an user account.

#### Attributes

This endpoint expects the following attributes passed as a path params:

- userId: The value that represents the user id.
- tradeId: The value that represents associated trade.

#### Return value

On successful completion, the response will contain a JSON with the following attributes:

- tradeId: An unique identifier for the trade.
- orderType: A string type value that can either be buy or sell.
- quantity: A number type value that should be greater than zero.
- price: A number type value that should be greater than zero.
- symbol: A string type value that represents the share symbol.
- userId: A string type value that represents the user id.
- timestamp: A timestamp to denote the execution time of the trade.

On failure, API responses & appropriate messages will be passed due to one of the following cases:

- Status Code: 400 
  - If any of the values is missing or is invalid. 
  - If no matching trade is found.

- Status Code: 500
  - Internal server error

#### Sample Request & Response

**Request**

```bash
curl --location --request DELETE '<BASE API ENDPOINT>/trade/userId/tradeId'
```

**Response**

```json
{
  "userId": "userId",
  "quantity": 100,
  "symbol": "MSFT",
  "price": 10,
  "orderType": "BUY",
  "tradeId": "tradeId",
  "timestamp": "2020-01-01T080:00:00.000Z"
}
```

**Postman Implementation**

![Delete Trade Example](https://ik.imagekit.io/lemonbouy/example-delete-trade_pm9bhKvQt.png)

### Get Portfolio

This API endpoint extends the functionality of fetching the user portfolio

#### Attributes

This endpoint expects the following attributes passed as a path params:

- userId: The value that represents the user id.

#### Return value

On successful completion, the response will contain a JSON object structured as array of objects with the following attributes:

- symbol: The value that represents the share symbol.
- quantity: The value that represents the cumulative quantity of share.
- price: The value that represents the average price of share.
- currentPrice: the value that represents the current price of the share.
- returns: An object containing gains / losses in terms of value & percentage
- trades: An array of objects containing each trade's information.

On failure, API responses & appropriate messages will be passed due to one of the following cases:

- Status Code: 400
	- If no matching portfolio is found.

- Status Code: 500
  - Internal server error

#### Sample Request & Response

**Request**
```bash
curl --location --request GET '<BASE API ENDPOINT>/portfolio/userId'
```

**Response**
```json
[
    {
        "symbol": "ABCDEF",
        "quantity": 0,
        "price": 10,
        "currentPrice": 100,
        "returns": {
            "value": 18000,
            "percentage": 900
        },
        "trades": [
            {
                "quantity": 100,
                "price": 10,
                "orderType": "BUY",
                "tradeId": "A1B1C1",
                "timestamp": "2020-00-01T00:00:00.000Z"
            },
            {
                "quantity": 100,
                "price": 10,
                "orderType": "BUY",
                "tradeId": "D1E1F1",
                "timestamp": "2020-00-01T00:00:00.000Z"
            }
        ]
    }
]
```

**Postman Implementation**

![Get Portfolio Example](https://ik.imagekit.io/lemonbouy/example-get-portfolio_UvHemXMME.png)

### Get Holdings

This API endpoint extends the functionality of fetching the user current holdings.

#### Attributes

This endpoint expects the following attributes passed as a path params:

- userId: The value that represents the user id.

#### Return value

On successful completion, the response will contain a JSON object structured as array of objects with the following attributes:

- symbol: The value that represents the share symbol.
- quantity: The value that represents the cumulative quantity of share.
- price: The value that represents the average price of share.

On failure, API responses & appropriate messages will be passed due to one of the following cases:

- Status Code: 400
	- If no matching stock holdings are found.

- Status Code: 500
  - Internal server error

#### Sample Request & Response

**Request**
```bash
curl --location --request GET '<BASE API ENDPOINT>/portfolio/holdings/userId'
```

**Response**
```json
[
    {
        "symbol": "ABCDEF",
        "quantity": 300,
        "price": 10
    },
    {
        "symbol": "EFGHIJ",
        "quantity": 200,
        "price": 10
    }
]
```

**Postman Implementation**

![Get Holdings Example](https://ik.imagekit.io/lemonbouy/example-get-holdings_35e7KWHkSN.png)

### Get User Returns Data

This API endpoint extends the functionality of fetching the user returns data.

#### Attributes

This endpoint expects the following attributes passed as a path params:

- userId: The value that represents the user id.

#### Return value

On successful completion, the response will contain a JSON object structured as array of objects with the following attributes:

- symbol: The value that represents the share symbol.
- quantity: The value that represents the cumulative quantity of share.
- price: The value that represents the average price of share.
- currentPrice: the value that represents the current price of the share.
- returns: An object containing gains / losses in terms of value & percentage

On failure, API responses & appropriate messages will be passed due to one of the following cases:

- Status Code: 400
	- If no matching data is found.

- Status Code: 500
  - Internal server error

#### Sample Request & Response

**Request**
```bash
curl --location --request GET '<BASE API ENDPOINT>/portfolio/returns/userId'
```

**Response**
```json
[
    {
        "symbol": "ABCDEF",
        "quantity": 100,
        "price": 10,
        "currentPrice": 100,
        "returns": {
            "value": 9000,
            "percentage": 900
        }
    },
    {
        "symbol": "EFGHIJ",
        "quantity": 200,
        "price": 10,
        "currentPrice": 100,
        "returns": {
            "value": 18000,
            "percentage": 900
        }
    }
]
```

**Postman Implementation**

![Get Stock Returns Example](https://ik.imagekit.io/lemonbouy/example-get-stock-returns-data_4XXjAZhhB.png)

## Test Cases

- [Add trade](test/api/trades/add.md)
- [Update trade](test/api/trades/update.md)
- [Delete trade](test/api/trades/delete.md)
- [Get user portfolio](test/api/portfolio/portfolio.md)
- [Get user holdings](test/api/portfolio/holdings.md)
- [Get user returns data](test/api/portfolio/returns.md)

## Future work

- Add test cases for all the API endpoints ( Unit & E2E tests )
- Add soft delete feature ( basically revert if accidently deleted security )
- Create a transaction rollback mechanism

**Made with :heart: by [AssaultKoder95](https://github.com/AssaultKoder95)**
