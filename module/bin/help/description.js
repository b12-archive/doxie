var bold = require('chalk').bold;

module.exports = [
  bold('DESCRIPTION'),
  '',
  '    http://npm.im/' + bold('doxie'),
  '    The simplest docs generator you’ve seen',
  '',
  '    All it does is take an array of data and pipe it through a bunch of ' +
    'plugins (functions). Just keep in mind that many plugins will expect ' +
    'data compatible with <http://npm.im/' + bold('dox') + '>. That’s it.'
  ,
  '',
  '    ' + bold('doxie') + ' operates over stdio.',
].join('\n');
