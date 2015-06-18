#! /usr/bin/env node

const {stdin, stdout, stderr, argv, exit} = process;
const args = argv.slice(2);

const leave = (message) => {
  stdout.write(`${message}\n`);
  exit(0);
};

const flee = (message) => {
  stderr.write(`${message}\n`);
  exit(1);
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
const doxie = require('doxie-core');
const toJson = require('stream-to-json');
const implode = require('1-liners/implode');

const prefix = require('chalk').cyan('[doxie]') + ' ';
const tinyError = require('tiny-error')({prefix});

// Argument parsing
const pluginName = /^--(.+)$/;

const plugins = args.reduce((plugins, argument, index) => {
  const parsedPluginName = pluginName.exec(argument);
  const pluginsCount = plugins.length;

  // Add a new plugin.
  if (parsedPluginName) return plugins.concat({
    maker: require('doxie.' + parsedPluginName[1] + '/cli-plugin'),
      // TODO: Check if `maker` is a function
    args: [],
  });

  // Add arguments to the last plugin.
  if (pluginsCount) {
    plugins[pluginsCount - 1].args.push(argument);
    return plugins;
  }

  throw tinyError(
    `Unrecognized argument: “${argument}” (position ${index + 1}).`
  );
}, []);

// The logic
toJson(stdin, function (error, data) {
  if (error) flee(
    `${prefix}Invalid JSON input: “${error.message}”.\n`
  );

  doxie(
    plugins.map(({maker, args}) => implode(maker)(args)),
    {stdout, stderr}
  )(data);

  process.exit(0);
});
