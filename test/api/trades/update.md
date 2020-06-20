## Test cases for updating a trade

This the checklist of the test cases that we will add in order to test our system.

### Success cases

- [ ] Should update the trade with a valid tradeId if only price is provided
- [ ] Should update the trade with a valid tradeIdif only quantity is provided
- [ ] Should update the trade with a valid tradeId & payload ( quantity + price )
  - [ ] validate the old trade effect is negated
  - [ ] validate the new trade effect is results in updated portfolio

### Failure cases

- [ ] Should an error if an invalid tradeId is provided
- [ ] Should an error if quantity & price are missing
- [ ] Should an error if quantity is not a number ( eg string / boolean / object )
- [ ] Should an error if quantity is not a number ( eg NaN )
- [ ] Should an error if quantity is less than or equal to zero
- [ ] Should an error if price is not a number ( eg string / boolean / object )
- [ ] Should an error if price is not a number ( eg NaN )
- [ ] Should an error if price is less than or equal to zero
- [ ] Should an error if an non existing tradeId is provided
