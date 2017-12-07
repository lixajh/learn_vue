const SAVE_TO_LEANCLOUD = require('./job');
const CronJob = require('cron').CronJob;

function createCornJob () {
  return new CronJob('* 0 47 17 * * * ', function () { SAVE_TO_LEANCLOUD(); }, null, true, 'Asia/Shanghai');
}

module.exports = createCornJob
