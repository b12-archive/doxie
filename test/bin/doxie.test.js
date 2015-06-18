const tape = require('tape-catch');
const {spawn} = require('nexpect');
const {resolve} = require('path');
const {test, plus, curry} = require('1-liners');

const title = curry(plus)('The CLI program:  ');
const doxie = resolve(__dirname, '../../module/bin/doxie.js');

tape(title('Prints usage'), (is) => {
  is.plan(6);

  spawn(
    `${doxie}`, {stream: 'stderr'}
  ).run((error, output, exit) => {
    if (error) throw error;

    is.equal(exit, 1,
      '`doxie` fails…'
    );

    is.ok(
      test(output, /^usage:/i),
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
      test(output, /^usage/i),
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
      test(output, /SYNOPSIS/),
      'and prints manpage-like help'
    );
  });
});
