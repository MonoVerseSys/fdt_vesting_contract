const moment = require('moment')
const tokenAddress = '0x292a3CcdD40B44850E4cC1F0D12d5F73697A4f16'
const beneficiary = '0xD3108FDD2417474892be85bae97603ee8EAB92c8';
const start = moment('2022-03-31T00:00:00+09:00').unix();
const vestringDay = 180

module.exports = [
    tokenAddress, 
    beneficiary,
    start,
    vestringDay * 60 * 60 * 24
];