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


**⚠ Heads up!** This is totally a work in progress. [Thoughts and ideas][] are very welcome.

[Thoughts and ideas]:  https://github.com/studio-b12/doxie/issues




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

…




License
-------

[MIT][] © [Studio B12 GmbH][]

[MIT]:              ./License.md
[Studio B12 GmbH]:  http://www.studio-b12.de
