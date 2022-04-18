const moment = require('moment')
const tokenAddress = '0x3a599e584075065eaaac768d75eaef85c2f2ff64'


const beneficiary = process.env.Address || '0x84a839BC182154A8fCbaDC44D3b65ee94C9C312A';
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