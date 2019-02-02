const path = require('path');
const winston = require('winston');
const moment = require('moment-timezone');

const level = process.env.LOG_LEVEL || 'info';
const { combine, label, printf } = winston.format;
const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`);
const appendTimestamp = winston.format((info, opts) => {
  const newInfo = Object.assign({}, info);
  if (opts.tz) {
    newInfo.timestamp = moment().tz(opts.tz).format();
  }
  return newInfo;
});

module.exports = ({ rootPath, settings }) => {
  const format = combine(
    label({ label: settings.label || 'main' }),
    appendTimestamp({ tz: settings.timeZone || 'Asia/Tokyo' }),
    myFormat,
  );

  const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    level,
    format,
    transports: [
      new winston.transports.File({ filename: path.join(rootPath, 'log-files', 'error.log'), level: 'error' }),
      new winston.transports.File({ filename: path.join(rootPath, 'log-files', 'combined.log') }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format,
    }));
  }

  return logger;
};
