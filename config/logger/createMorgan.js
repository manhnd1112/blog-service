// const fs = require('fs');
// const path = require('path');
const createMorgan = require('morgan');
const moment = require('moment-timezone');

module.exports = ({ logger }) => {
  // const appDir = path.dirname(require.main.filename);

  // const accessLogStream = fs.createWriteStream(
  //   path.join(appDir, 'log-files', 'access.log'),
  //   { flags: 'a' },
  // );

  createMorgan.token('date', (req, res, tz) => moment().tz(tz).format());
  // eslint-disable-next-line
  // createMorgan.format('myformat', '[:date[Asia/Tokyo]] ":method :url" :status :res[content-length] - :response-time ms');
  createMorgan.format('myformat', '":method :url" :status :res[content-length] - :response-time ms');

  return createMorgan('myformat', {
    stream: {
      write: message => logger.info(message.trim()),
    },
  });
};
