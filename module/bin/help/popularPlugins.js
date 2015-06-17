var bold = require('chalk').bold;

module.exports = [
  bold('POPULAR PLUGINS'),
  '',
  '    ' + bold('--filter') + ' [<filter function (default: ' +
    '.doxie.filter.js)>]'
  ,
  '        Filter comments through a custom function.',
  '        <http://npm.im/doxie.filter>',
  '',
  '    ' + bold('--render') + ' [<template function (default: ' +
    '.doxie.render.js)>]'
  ,
  '        Render comments with a simple, flexible function.',
  '        <http://npm.im/doxie.render>',
  '',
  '    ' + bold('--output'),
  '        Output rendered comments.',
  '        <http://npm.im/doxie.output>',
  '',
  '    For an up-to-date list of available plugins visit ' +
    '<https://www.npmjs.com/browse/keyword/doxie-plugin>.'
  ,
].join('\n');
  // TODO: Rather list high-level plugins like keep, drop, preset.
