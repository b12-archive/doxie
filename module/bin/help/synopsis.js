/* jshint maxlen: 99999 */

const {bold} = require('chalk');

module.exports =
`${bold('SYNOPSIS')}

${require('./usage').replace(/^/mg, '    ')}
`;
