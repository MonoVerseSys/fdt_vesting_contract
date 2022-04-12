const moment = require('moment')
const tokenAddress = '0x3a599e584075065eAAAc768D75EaEf85c2f2fF64'


const beneficiary = '0x36D02efda407e47B9FAa7747EA435c14BAe0a26e';
const start = moment('2023-01-01T00:00:00+09:00');
const end = moment('2023-11-01T00:00:00+09:00');

const vesting = moment.duration(end.diff(start))
console.log(`vesting s: ${vesting.asSeconds()}, vesting d: ${vesting.asDays()}`)

module.exports = [
    tokenAddress, 
    beneficiary,
    start.unix(),
    vesting.asSeconds()
];