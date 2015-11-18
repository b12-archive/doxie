<p                                                                   id="/"></p>
[![Coveralls – test coverage
](https://img.shields.io/coveralls/studio-b12/doxie.svg?style=flat-square
)](https://coveralls.io/r/studio-b12/doxie
) [![Travis – build status
](https://img.shields.io/travis/studio-b12/doxie/master.svg?style=flat-square
)](https://travis-ci.org/studio-b12/doxie
) [![David – status of dependencies
](https://img.shields.io/david/studio-b12/doxie.svg?style=flat-square
)](https://david-dm.org/studio-b12/doxie
) [![Stability: unstable
](https://img.shields.io/badge/stability-unstable-yellowgreen.svg?style=flat-square
)](https://github.com/studio-b12/doxie/milestones/1.0
) [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square
)](https://github.com/airbnb/javascript
) [![Join the chat at https://gitter.im/studio-b12/doxie
](https://img.shields.io/badge/GITTER-JOIN%20CHAT%20%E2%86%92-1dce73.svg?style=flat-square
)](https://gitter.im/studio-b12/doxie?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
)




<h1                                                              align="center">
  <img
    alt="git.io/doxie"
    width="404"
    height="472"
    src="https://cdn.rawgit.com/studio-b12/doxie/0f9546e/doxie.svg"
  />
</h1>

<h4                                                      align="center"><strong>
  The simplest doc generator you’ve seen.
</strong></h4>

<p                                                                    ><br/></p>
<p                                                                    ><br/></p>



**— But wait! We have [jsDoc][], [docco][], [documentation][] and [umpteen][] other doc generators. Do we really need another one?**

— We’ve looked through all umpteen of them. We even heavily used one or the other. But what we’re after is flexibility. If you’re a perfectionist, construct your docs from the ground up, and polish them down to the very last detail to suit them to your liking. If you want decent results quickly, choose a ready-made theme. Probably you’re somewhere in between – so take a preset and tweak it a bit. We’re talking about total flexibility. This wasn’t possible before.

**— OK, I get it now. But if you want generic stuff, there’s [gulp][], and there was [grunt][]. Aren’t they de-facto tools for such things?**

— Gulp is very flexible. But it’s designed to process individual files. Just like [metalsmith][] is designed to process whole directories. We need another abstraction. We have functions, objects, or CSS classes to document – and often we don’t even care what file they’re in. We call these things *docs*. Gulp works with files, and doxie works with *docs*.

**— Well, now it becomes clear. Thanks for the interview.**

— You’re very welcome.

[jsDoc]:          http://usejsdoc.org/
[docco]:          http://jashkenas.github.io/docco/
[documentation]:  http://npm.im/documentation
[umpteen]:        https://www.npmjs.com/browse/keyword/documentation
[gulp]:           http://gulpjs.com/
[grunt]:          http://gruntjs.com/
[metalsmith]:     http://www.metalsmith.io/




<p                                               id="/made-with-doxie"><br/></p>

Made with doxie
---------------

These readmes have been rendered with doxie:

* [git-tips/tips][]
* [studio-b12/tape-css][]
* [npm-scripts/scripts][]
* [studio-b12/bare-select][]
* [parametric-svg/patch][]
* [studio-b12/mve][]
* [studio-b12/polydox][]

[git-tips/tips]:           https://github.com/git-tips/tips
[studio-b12/tape-css]:     https://github.com/studio-b12/tape-css
[npm-scripts/scripts]:     https://github.com/npm-scripts/scripts
[studio-b12/bare-select]:  https://github.com/studio-b12/bare-select
[parametric-svg/patch]:    https://github.com/parametric-svg/patch
[studio-b12/mve]:          https://github.com/studio-b12/mve
[studio-b12/polydox]:      https://github.com/studio-b12/polydox




<p                                                  id="/installation"><br/></p>

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




<p                                                         id="/usage"><br/></p>

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




<p                                                       id="/license"><br/></p>

License
-------

[MIT][] © [Studio B12 GmbH][]

[MIT]:              ./License.md
[Studio B12 GmbH]:  http://www.studio-b12.de
