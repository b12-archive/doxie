#! /usr/bin/env node

var doxie = require('doxie-core');
var tinyError = require('tiny-error');
var implode = require('1-liners/implode');

var args = process.argv.slice(2);
var pluginName = /^--(.+)$/;

var plugins = args.reduce(function(plugins, argument) {
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

  throw tinyError('Unrecognized argument: ' + argument);
    // TODO: Be more helpful
}, []);

doxie(plugins.map(function(plugin) {
  return implode(plugin.maker)(plugin.args);
}));
