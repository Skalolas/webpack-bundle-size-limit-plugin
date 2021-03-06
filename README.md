# Webpack Bundle Size Limit Plugin

## Quick Start

Install the plugin:

```
yarn -D webpack-bundle-size-limit-plugin
```

Add it as as a plugin:

```
// webpack.config.js

const WebpackBundleSizeLimitPlugin = require('webpack-bundle-size-limit-plugin');
...
plugins: [
  new WebpackBundleSizeLimitPlugin()
]
```

Let's say you have one bundle, a client bundle named `client.bundle.js`. In your package.json, add a "bundles" section like so:

```
"bundles": [
  {
    "name": "client.bundle.js",
    "maxSize": "10K"
  }
]
```

Then run webpack:

```
yarn webpack
```

If the client bundle is larger than 10 kilobytes (let's say it's actually 14.4 KB for this example), then you'll get an error message like this:

```
ERROR in webpack-bundle-size-limit-plugin. Bundle size exceeded.
  Bundle name:  client.bundle.js
  Bundle size:  14.4KB
  Bundle limit: 10KB
```

## Configuration

### config

By default, this plugin will look at the "bundles" array in your package.json to get the config, but you can optionally specify another location for the config via the `config` option:

```
const path = require('path');
...
plugins: [
  new WebpackBundleSizeLimitPlugin({
    config: path.join(__dirname, './my-config-file.js');
  });
]
```

The config file should look like this:

```
// my-config-file.js

module.exports = {
  bundles: [
    {
      name: 'client.bundle.js',
      maxSize: '10K'
    }
  ]
};
```

### include

By default, all emitted assets will be analyzed, but you can specify exactly which type of assets the plugin analyzes with the `include` option:

```
plugins: [
  new WebpackBundleSizeLimitPlugin({
    include: ['.js', '.css'];
  });
]
```

Now, only generated assets with `js` or `css` file extensions will be anlyzed by the plugin.

If this option is specified, the `exclude` option should not be specified.

### Exclude

This is the opposite of the `include` option. All extensions listed in the 'exclude' array will be excluded from analysis by the plugin.

```
plugins: [
  new WebpackBundleSizeLimitPlugin({
    exclude: ['.png', '.jpg'];
  });
]
```

Now, all generated files except files with `.png` or `.jpg` extensions will be analyzed by the plugin.

By default, no assets will be excluded. If this option is specified, the `include` option should not be specified.

### enforceForAllBundles

By default, if webpack emits an asset that is not present in the config, a warning will be logged. By setting this config to `true`, webpack will log an error and fail the build.

```
plugins: [
  new WebpackBundleSizeLimitPlugin({
    enforceForAllBundles: true
  });
]
```

## The configuration file

The config should look like this:

```
bundles: [
  {
    name: 'client.bundle.js',
    maxSize: '10K'
  }
]
```

Both the `name` and `maxSize` fields are required.

### Units

Valid units for the `maxSize` property are:

- B, byte, bytes
- K, KB, kilobyte, kilobytes
- M, MB, megabyte, megabytes
- G, GB, gigabyte, gigabytes
- T, TB, terabyte, terabytes

Here are some examples:

```
maxSize: '35B'
maxSize: '40KB'
maxSize: '1.2 megabytes',
maxSize: '1 gigabyte',
maxSize: '2 TB'
```

Any combination of uppercase and lowercase letters are allowed when specifying the unit.

### Patterns

For bundles that are generated by webpack with dynamic names, content hashes, or other non-static names, this plugin allows you to specify a pattern rather than a specific bundle name.

For example, if webpack generates a vendor bundle and adds a content hash to it, it might be named something like this:

```
vendors.bundle.5a8776776c0ea8f506dc.js
```

To match this in your config, you can do something like this:

```
bundles: [
  {
    name: 'vendors.bundle.*.js',
    maxSize: '2.3 MB'
  }
]
```
