const tape = require('tape-catch');
const spawn = require('tape-spawn');
const {resolve} = require('path');
const {test, plus, curry} = require('1-liners');
const {execFile} = require('child_process');

const title = curry(plus)('The CLI program:  ');
const doxie = resolve(__dirname, '../../module/bin/doxie.js');
const doxieCommand = curry(execFile)(doxie);

tape(title('Prints usage'), (is) => {
  is.plan(6);

  doxieCommand([], (error, _, stderr) => {
    is.equal(error && error.code, 1,
      '`doxie` fails…'
    );

    is.ok(
      test(stderr, /^usage:/i),
      '…and prints usage to stderr'
    );
  });

  doxieCommand(['-h'], (error, stdout) => {
    is.equal(error, null,
      '`doxie -h` succeeds…'
    );

    is.ok(
      test(stdout, /^usage/i),
      '…and prints usage'
    );
  });

  doxieCommand(['--help'], (error, stdout) => {
    is.equal(error, null,
      '`doxie --help` succeeds…'
    );

    is.ok(
      test(stdout, /SYNOPSIS/),
      '…and prints manpage-like help'
    );
  });
});

tape(title('`doxie --<plugin>` fails having received empty input'), (is) => {
  const process = spawn(is, `${doxie} --output`);
  process.timeout(500);

  process.exitCode(
    1,
    'exiting `1`'
  );

  process.stderr.match(
    /invalid json input/i,
    'with a helpful message'
  );

  process.stdin.destroy();
  process.end();
});

tape(title('`doxie --<plugin>` fails having received invalid JSON'), (is) => {
  const process = spawn(is, `${doxie} --output`);
  process.timeout(500);

  process.exitCode(
    1,
    'exiting `1`'
  );

  process.stderr.match(
    /invalid json input/i,
    'with a helpful message'
  );

  process.stdin.write('a');
  process.stdin.destroy();
  process.end();
});

tape(title(
  '`doxie --<plugin>` fails when it gets a non-array as input'
), (is) => {
  const process = spawn(is, `${doxie} --output`);
  process.timeout(500);

  process.exitCode(
    1,
    'exiting `1`'
  );

  process.stderr.match(
    /\[doxie-core\]/i,
    'with a message from doxie-core'
  );

  process.stdin.write('{"a": 1}');
  process.stdin.destroy();
  process.end();
});

tape(title(
  '`doxie --render <path> --output` works as expected'
), (is) => {
  is.plan(2);

  const renderPath = resolve(__dirname, '../mock-cwd/.render.doxie.js');
  const process = spawn(is,
    `${doxie} --render ${renderPath} --output`
  );
  process.timeout(500);

  process.succeeds(
    'exiting successfully'
  );

  process.stdout.match(
`#  one  #

## Parameters

* \`{Array} stuff\` – exiting things
* \`{Object} things\` – exiting stuff


#  two  #

## Parameters

(none)


`   ,
    'producing pretty output'
  );

  process.stdin.write(`
[ { "title": "one"
  , "parameters":
    [ { "name": "stuff"
      , "type": "Array"
      , "description": "exciting things"
      }
    , { "name": "things"
      , "type": "Object"
      , "description": "exciting stuff"
      }
    ]
  }
, { "title": "two"
  , "parameters": []
  }
]
`);
  process.stdin.destroy();
  process.end();
});
