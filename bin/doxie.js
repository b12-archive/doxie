#! /usr/bin/env node

var args = process.argv.slice(2);

// Usage info
if (!args.length || args[0] === '-h') return console.log(
  require('./help/usage')
); else if (args[0] === '--help') return console.log('\n' + [
  require('./help/synopsis'),
  require('./help/description'),
  require('./help/examples'),
  require('./help/popularPlugins'),
].join('\n\n\n'));

// Imports
var doxie = require('doxie-core');
var toJson = require('stream-to-json');
var implode = require('1-liners/implode');

var tinyError = require('tiny-error')({
  prefix: require('chalk').cyan('[doxie]') + ' ',
});

// Argument parsing
var pluginName = /^--(.+)$/;

var plugins = args.reduce(function(plugins, argument, index) {
  var parsedPluginName = pluginName.exec(argument);
  var indexOfLastPlugin = plugins.length;

  if (parsedPluginName) return plugins.concat({
    maker: require('doxie.' + parsedPluginName[1] + '/cli-plugin'),
      // TODO: Check if `maker` is a function
    args: [],
  });

  else if (indexOfLastPlugin) {
    plugins[indexOfLastPlugin].args.push(argument);
    return plugins;
  }

  throw tinyError('Unrecognized argument: ' +
    '“' + argument + '” ' +
    '(position ' + (index + 1) + ').'
  );
}, []);

// The logic
toJson(process.stdin, function (error, data) {
  doxie(plugins.map(function(plugin) {
    return implode(plugin.maker)(plugin.args);
  }))(data);
});
