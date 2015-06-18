const tape = require('tape-catch');
const {spawn} = require('nexpect');
const {resolve} = require('path');
const {test, plus, curry, property, map, shave} = require('1-liners');

const kill = shave(1, process.kill);
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
      test(output.join('\n'), /^usage:/i),
      '…and prints usage'
    );
  });

  spawn(
    `${doxie} -h`
  ).run((error, output, exit) => {if (error) throw error;
    is.equal(exit, 0,
      '`doxie -h` succeeds…'
    );

    is.ok(
      test(output.join('\n'), /^usage/i),
      '…and prints usage'
    );
  });

  spawn(
    `${doxie} --help`
  ).run((error, output, exit) => {if (error) throw error;
    is.equal(exit, 0,
      '`doxie --help` succeeds…'
    );

    is.ok(
      test(output.join('\n'), /SYNOPSIS/),
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
