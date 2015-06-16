[![Coveralls – test coverage
](https://img.shields.io/coveralls/studio-b12/doxie.svg?style=flat-square)
](https://coveralls.io/r/studio-b12/doxie)
 [![Travis – build status
](https://img.shields.io/travis/studio-b12/doxie/master.svg?style=flat-square)
](https://travis-ci.org/studio-b12/doxie)
 [![David – status of dependencies
](https://img.shields.io/david/studio-b12/doxie.svg?style=flat-square)
](https://david-dm.org/studio-b12/doxie)
 [![Stability: experimental
](https://img.shields.io/badge/stability-experimental-yellow.svg?style=flat-square)
](https://nodejs.org/api/documentation.html#documentation_stability_index)
 [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)
](https://github.com/airbnb/javascript)




doxie
=====

**The simplest doc generator you’ve seen.**




<p align="center"><a
  title="Graphic by the great Justin Mezzell"
  href="http://justinmezzell.tumblr.com/post/89652317743"
  >
  <br/>
  <br/>
  <img
    src="Readme/Compass.gif"
    width="400"
    height="300"
  />
  <br/>
  <br/>
</a></p>




Installation
------------

*doxie* is a command-line tool.

```sh
$ npm install --global doxie
```


*doxie* itself is just a slim core. Every feature is a plugin. So if you want to run `doxie --filter --output`, make sure you install *[doxie.filter][]* and *[doxie.output][]* first:

```sh
$ npm install --global doxie.filter doxie.output
```


Speaking of plugins, most of them are compatible with *[dox][]*

```sh
$ npm install --global dox
```


[doxie.filter]:  http://npm.im/doxie.filter
[doxie.output]:  http://npm.im/doxie.output
[dox]:           http://npm.im/dox




Usage
-----

**SYNOPSIS**

    Usage: doxie [--help|-h]
       or: doxie (--<plugin> [<plugin options>])+


**DESCRIPTION**

http://npm.im/doxie
The simplest docs generator you’ve seen

All it does is take an array of data and pipe it through a bunch of plugins (functions). Just keep in mind that many plugins will expect data compatible with <http://npm.im/dox>. That’s it.

doxie operates over stdio.


**EXAMPLES**

High level:
    $ dox < myLibrary.js | doxie  \
    $   --drop @private           \
    $   --drop @protected         \
    $   --sort by @module         \
    $   --preset 1-liners         \
    $   --inject into Readme.md

Low level:
    $ doxie                                                      \
    $   --filter build/filter.js                                 \
    $   --render build/template.js                               \
    $   --output                                                 \
    $   < data.json                                              \
    $   | cat build/Readme.overview.md - build/Readme.footer.md  \
    $   > Readme.md

Note that not all of the above plugins are available at the time of writing.


**POPULAR PLUGINS**

    --filter [<filter function (default: .doxie.filter.js)>]
        Filter comments through a custom function.
        <http://npm.im/doxie.filter>

    --render [<template function (default: .doxie.render.js)>]
        Render comments with a simple, flexible function.
        <http://npm.im/doxie.render>

    --output
        Output rendered comments.
        <http://npm.im/doxie.output>

For an up-to-date list of available plugins visit <https://www.npmjs.com/browse/keyword/doxie-plugin>.




License
-------

[MIT][] © [Studio B12 GmbH][]

[MIT]:              ./License.md
[Studio B12 GmbH]:  http://www.studio-b12.de
