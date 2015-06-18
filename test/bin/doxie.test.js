const tape = require('tape-catch');
const {spawn} = require('nexpect');
const {resolve} = require('path');
const {test, plus, curry, property, map, shave} = require('1-liners');
const {execFile} = require('child_process');

const kill = shave(1, process.kill);
const title = curry(plus)('The CLI program:  ');
const doxie = curry(execFile)(
  resolve(__dirname, '../../module/bin/doxie.js')
);

tape(title('Prints usage'), (is) => {
  is.plan(6);

  doxie([], (error, _, stderr) => {
    is.equal(error && error.code, 1,
      '`doxie` fails…'
    );

    is.ok(
      test(stderr, /^usage:/i),
      '…and prints usage to stderr'
    );
  });

  doxie(['-h'], (error, stdout) => {
    is.equal(error, null,
      '`doxie -h` succeeds…'
    );

    is.ok(
      test(stdout, /^usage/i),
      '…and prints usage'
    );
  });

  doxie(['--help'], (error, stdout) => {
    is.equal(error, null,
      '`doxie --help` succeeds…'
    );

    is.ok(
      test(stdout, /SYNOPSIS/),
      '…and prints manpage-like help'
    );
  });
});

tape(title('Fails gracefully'), (is) => {
  is.plan(4);

  const pids = map(curry(property)('pid'), [
    spawn(
      `${doxie} --output`,
      {stream: 'stderr'}
    )
      .sendEof()
      .run((error, output, exit) => {if (error) throw error;
        is.equal(exit, 1,
          'piping empty input into `doxie --<plugin>` fails…'
        );

        is.ok(
          test(output.join('\n'), /invalid json input/i),
          '…and results in a helpful message'
        );
      })
    ,

    spawn(
      `${doxie} --output`,
      {stream: 'stderr'}
    )
      .sendline('not JSON')
      .sendEof()
      .run((error, output, exit) => {if (error) throw error;
        is.equal(exit, 1,
          'piping invalid JSON into `doxie --<plugin>` fails…'
        );

        is.ok(
          test(output.join('\n'), /invalid json input/i),
          '…and results in a helpful message'
        );
      })
    ,
  ]);

  // Kill any dangling processes.
  setTimeout(() => {
    try {
      pids.forEach(kill);
    } catch (error) {
      if (error.code !== 'ESRCH') throw error;
    }
  }, 500);
});
