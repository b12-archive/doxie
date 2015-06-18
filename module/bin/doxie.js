#! /usr/bin/env node

var args = process.argv.slice(2);

const leave = (message) => {
  process.stdout.write(`${message}\n`);
  process.exit(0);
};

const flee = (message) => {
  process.stderr.write(`${message}\n`);
  process.exit(1);
};

// Usage info
if (!args.length) flee(
  require('./help/usage')
);

if (args[0] === '-h') leave(
  require('./help/usage')
);

if (args[0] === '--help') leave(
  '\n' + [
    require('./help/synopsis'),
    require('./help/description'),
    require('./help/examples'),
    require('./help/popularPlugins'),
  ].join('\n\n\n')
);

// Imports
var doxie = require('doxie-core');
var toJson = require('stream-to-json');
var implode = require('1-liners/implode');

var prefix = require('chalk').cyan('[doxie]') + ' ';
var tinyError = require('tiny-error')({prefix});

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
  if (error) flee(
    `${prefix}Invalid JSON input: “${error.message}”.\n`
  );

  doxie(
    plugins.map(function(plugin) {
      return implode(plugin.maker)(plugin.args);
    }),
    {
      stdout: process.stdout,
      stderr: process.stderr,
    }
  )(data);
});
