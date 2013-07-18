npm-web-environments [![Build Status](https://travis-ci.org/kjirou/npm-web-environments.png)](https://travis-ci.org/kjirou/npm-web-environments)
====================

A npm package for setting environment variables to use in web-browsers.


## Download

- [Stable production version](https://raw.github.com/kjirou/npm-web-environments/master/web-environments.min.js)
- [Stable development version](https://raw.github.com/kjirou/npm-web-environments/master/web-environments.js)
- [Old releases](https://github.com/kjirou/npm-web-environments/releases)

Or, if you can use node.js:
```
$ npm install web-environments
```


## Supported browsers/node.js

- `IE10`, `IE9`, `IE8`, `IE7`
- `Chrome`
- `Firefox`
- `Safari`
- `Mobile Safari`
- `PhantomJS`
- `node.js` >= `0.11.0`


## License

[Public Domain](http://creativecommons.org/publicdomain/zero/1.0/)


## Usage
```
// If you want to use by node.js
//var webenv = require("web-environments");

// Set environments
webenv.set({
  env1: 123,
  env2: "hogehoge",
  env3: true,
  env4: {
    x: 1,
    y: 2
  }
});

// Overwrite environments
webenv.set("env2", "fugafuga");
webenv.set("env4.y", 22);

// Extend environments by object
webenv.extend({
  env3: false,
  env5: "Append value"
});

// Get environments
console.log(webenv.get("env1"));   // -> 123
console.log(webenv.get("env2"));   // -> "hogehoge"
console.log(webenv.get("env3"));   // -> false
console.log(webenv.get("env4"));   // -> {x: 1, y: 22}
console.log(webenv.get("env4.x")); // -> 1
console.log(webenv.get("env4.y")); // -> 22
console.log(webenv.get("env5"));   // -> "Append value"
console.log(webenv.get());         // -> All environments
```


## File Structure Sample

index.html:
```
..

<head>
  <script src="web-environments.js"></script>
  <script src="base-environments.js"></script>
  <script src="production-environments.js"></script>
</head>

..
```

base-environments.js:
```
webenv.set({
  debug: true,
  baseUrl: "http://localhost:80",
  someSetting1: true,
  someSetting2: false,
  someSetting3: false
});
```

production-environments.js:
```
// You can overwrite values optionally.
webenv.extend({
  debug: false,
  baseUrl: "http://your-production-site.com/",
  someSetting2: true
});
```


## API Reference

- `data-path`
  - This is a path for targeting data that is represented by "." separated string.
  - e.g. `"a.b.c"` means `{a: {b: c: targetValue}}`.
- `webenv.set(dataPath, data)`
- `webenv.set(data)`
- `webenv.extend(dataPath, data)`
- `webenv.extend(data)`
- `webenv.get(dataPath?)`
- `webenv.get(dataPath, defaultValue)`


## Development

### Dependencies

- `node.js` >= `0.11.0`, e.g. `brew install node`
- `PhantomJS`, e.g. `brew install phantomjs`

```
$ npm install -g grunt-cli testem
```

### Deploy

```
$ git clone git@github.com:kjirou/npm-web-environments.git
$ cd npm-web-environments
$ npm install
$ grunt
```

### Utils commands

- `grunt jshint` validates codes by JSHint.
- `grunt release` generates JavaScript files for release.

### Testing

- Open [test/index.html](test/index.html)
- Execute `testem` or `testem server`, after that, open [http://localhost:7357/](http://localhost:7357/)
- `grunt test` tests by node.js.
- `grunt webtest` is CI test by PhantomJS only.
- `grunt testem:xb` is CI test by PhantomJS, Chrome, Firefox and Safari.


## Related Links

- [npm - web-environments](https://npmjs.org/package/web-environments)
