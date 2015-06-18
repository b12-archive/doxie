var test = require('tape-catch');

test('Programmatic usage fails', function(is) {
  is.throws(
    function() {require('../module/index');},
    /look into .*doxie-core/i,
    'with a helpful message'
  );

  is.end();
});
