const test = require('tape-catch');
const {spawn} = require('nexpect');
const {resolve} = require('path');

const doxie = resolve(__dirname, '../../module/bin/doxie.js');

test('The CLI program works', (is) => {
  is.plan(6);

  spawn(
    `${doxie}`, {stream: 'stderr'}
  ).run((error, output, exit) => {
    if (error) throw error;

    is.equal(exit, 1,
      '`doxie` fails…'
    );

    is.ok(
      /^usage:/i.test(output),
      'and prints usage'
    );
  });

  spawn(
    `${doxie} -h`
  ).run((error, output, exit) => {if (error) throw error;
    is.equal(exit, 0,
      '`doxie -h` succeeds…'
    );

    is.ok(
      /^usage/i.test(output),
      'and prints usage'
    );
  });

  spawn(
    `${doxie} --help`
  ).run((error, output, exit) => {if (error) throw error;
    is.equal(exit, 0,
      '`doxie --help` succeeds…'
    );

    is.ok(
      /SYNOPSIS/.test(output),
      'and prints manpage-like help'
    );
  });
});
