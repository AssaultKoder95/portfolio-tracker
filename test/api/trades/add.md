## Test cases for adding a trade

This the checklist of the test cases that we will add in order to test our system.

### Success cases

- [ ] Should add a BUY trade with a valid payload & validate a new portfolio is created
- [ ] Should add a SELL trade with a valid payload for an existing portfolio

### Failure cases

#### Missing value errors

- [ ] Should send an error if order type is not passed in payload
- [ ] Should send an error if quantity is not passed in payload
- [ ] Should send an error if price is not passed in payload
- [ ] Should send an error if symbol is not passed in payload
- [ ] Should send an error if user id is not passed in payload

#### Invalid type errors

- [ ] Should send an error if order type is not a string ( eg number / boolean / object )
- [ ] Should send an error if quantity is not a number ( eg string / boolean / object )
- [ ] Should send an error if quantity is not a number ( eg NaN )
- [ ] Should send an error if price is not a number ( eg string / boolean / object )
- [ ] Should send an error if price is not a number ( eg NaN )
- [ ] Should send an error if symbol is not a string ( eg number / boolean / object )
- [ ] Should send an error if user id is not a string ( eg number / boolean / object )

#### Generic errors

- [ ] Should send an error if order type is neither BUY nor SELL
- [ ] Should send an error if quantity is less than or equal to zero
- [ ] Should send an error if price is less than or equal to zero
- [ ] Should send an error if no associated user is found for a SELL order
- [ ] Should send an error if a SELL order is placed without any previous BUY order/s