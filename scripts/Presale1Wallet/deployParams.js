const moment = require('moment')
const tokenAddress = '0xFD52836a1e299BE4769FA7852Cd2FAE04E4618c3'


// const start = moment('2022-04-13T14:25:00+09:00');
// const end = moment('2022-04-13T16:25:00+09:00');


const start = moment('2022-04-18T00:00:00+00:00')
const end = moment('2022-09-18T00:00:00+00:00')

const vesting = moment.duration(end.diff(start))
console.log(`vesting s: ${vesting.asSeconds()}, vesting d: ${vesting.asDays()}`)

module.exports = [
    tokenAddress, 
    start.unix(),
    vesting.asSeconds()
];