# metalsmith-fingerprint-ignore

[![npm](https://img.shields.io/npm/v/metalsmith-fingerprint-ignore.svg)](https://www.npmjs.com/package/metalsmith-fingerprint-ignore) [![Build Status](https://travis-ci.org/superwolff/metalsmith-fingerprint-ignore.svg)](https://travis-ci.org/superwolff/metalsmith-fingerprint-ignore) [![Dependency Status](https://david-dm.org/superwolff/metalsmith-fingerprint-ignore.svg)](https://david-dm.org/superwolff/metalsmith-fingerprint-ignore) [![devDependency Status](https://david-dm.org/superwolff/metalsmith-fingerprint-ignore/dev-status.svg)](https://david-dm.org/superwolff/metalsmith-fingerprint-ignore#info=devDependencies) [![npm](https://img.shields.io/npm/dm/metalsmith-fingerprint-ignore.svg)](https://www.npmjs.com/package/metalsmith-fingerprint-ignore)

> A fork of metalsmith-fingerprint that discards the original file

This plugin fingerprints your files for easy and reliable cache-busting. Since you're not going to use the original, this fork discards it by default (but still allows you to keep it if you want to).

## Installation

```
npm install metalsmith-fingerprint-ignore
```

## Example

Say you want to fingerprint the file `css/index.css`:

```js
Metalsmith(__dirname)
  .use(fingerprint({ pattern: 'css/index.css' }))
  .use(template({ engine: 'handlebars' }))
  .build()
```

The plugin does three things:

1. create a duplicate of `index.css` with a fingerprinted filename
2. create a `fingerprint` object on the Metalsmith metadata
3. Discard the original `index.css` file

The `fingerprint` object is accessible from the Handlebars template:

```html
<link href="{{ fingerprint.[css/index.css] }}" rel="stylesheet" type="text/css" />
```

And the template renders the fingerprinted filename:

```html
<link href="css/index-724af9dd72a48c18dd570790c2445fb4.css" rel="stylesheet" type="text/css" />
```

## Options

You can pass options to `metalsmith-fingerprint-ignore` with the [Javascript API](https://github.com/segmentio/metalsmith#api) or [CLI](https://github.com/segmentio/metalsmith#cli). The options are:

* [pattern](#pattern): a pattern to filter source files (required)
* [keep](#keep): keep source file, false by default (optional)

### pattern

`String|Array<String>`: A [pattern](https://github.com/sindresorhus/multimatch) to filter source files. The path is relative to your `source`. Required.

```json
{
  "plugins": {
    "metalsmith-fingerprint-ignore": {
      "pattern": "css/index.css"
    }
  }
}
```

### keep

`Boolean`: Keep the original file. Setting it to true will keep the original file and create a fingerprinted version as well. Default `false`. Optional.

```json
{
  "plugins": {
    "metalsmith-fingerprint-ignore": {
      "pattern": "css/index.css",
      "keep": "true"
    }
  }
}
```

## Origins

Metalsmith fingerprint does not discard the original file after fingerprinting. So when fingerprinting a large collection of files you'll have to manually [ignore](https://github.com/segmentio/metalsmith-ignore) them all. Unfortunately the only predictable difference between the original and the fingerprinted file is the dash before the fingerprint.

An [issue](https://github.com/christophercliff/metalsmith-fingerprint/issues/5) was opened to address this, but closed as `wontfix`. So this fork is based on the [PR](https://github.com/christophercliff/metalsmith-fingerprint/pull/6) by [callum](https://github.com/callum), which can be used by those who would still like this functionality.

Thanks to:

* [christophercliff](https://github.com/christophercliff)
* [callum](https://github.com/callum)

## License

[MIT](https://github.com/superwolff/metalsmith-fingerprint-ignore/blob/master/LICENSE.md).
