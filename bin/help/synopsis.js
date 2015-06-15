var bold = require('chalk').bold;

module.exports = [
  bold('SYNOPSIS'),
  '',
  require('./usage').replace(/^/mg, '    '),
].join('\n');
