const moment = require('moment')
const tokenAddress = '0xFD52836a1e299BE4769FA7852Cd2FAE04E4618c3'


// const beneficiary = '0xD3108FDD2417474892be85bae97603ee8EAB92c8';
const start = moment('2022-04-12T11:10:00+09:00');
const end = moment('2022-04-12T14:00:00+09:00');

const vesting = moment.duration(end.diff(start))
console.log(`vesting s: ${vesting.asSeconds()}, vesting d: ${vesting.asDays()}`)

module.exports = [
    tokenAddress, 
    start.unix(),
    vesting.asSeconds()
];