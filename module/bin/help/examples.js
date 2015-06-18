/* jshint maxlen: 99999 */

const {bold} = require('chalk');

module.exports =
`${bold('EXAMPLES')}

    High level:
        $ dox < myLibrary.js | doxie  \\
        $   --drop @private           \\
        $   --drop @protected         \\
        $   --sort by @module         \\
        $   --preset 1-liners         \\
        $   --inject into Readme.md

    Low level:
        $ doxie                                                      \\
        $   --filter build/filter.js                                 \\
        $   --render build/template.js                               \\
        $   --output                                                 \\
        $   < data.json                                              \\
        $   | cat build/Readme.overview.md - build/Readme.footer.md  \\
        $   > Readme.md

    Note that not all of the above plugins are available at the time of writing.
`;
