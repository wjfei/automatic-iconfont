# automatic-iconfont

Iconfont is automatically generated from SVG files.

English | [简体中文](./README-zh_CN.md)

## 📦 Install

```bash
npm install w-automatic-iconfont --save-dev
```

```bash
yarn add w-automatic-iconfont --dev
```

support global install:

```bash
npm install w-automatic-iconfont -g
```

## 🔨 Usage

### 📝 Config file


Create a configuration file (`.autoicon.config.js`) in your project that reads as follows (this is also the default configuration for `w-automatic-iconfont`):

```js
module.exports = {
    fontName: "autofont", // iconfont css className
    srcDir: "svgs", // Source directory (relative to root)
    destDir: "dist" // Build directory (relative to root)
}
```

### ✨ Build

```bash
# help
$ auto-iconfont -h

# generate iconfont by default config file.
$ auto-iconfont

# console package version number
$ auto-iconfont -v

# Specify the SVG file directory
$ auto-iconfont -s svgs
$ auto-iconfont --srcDir svgs

# Specify build directory
$ auto-iconfont -d dist
$ auto-iconfont --destDir dist

# Specify custom iconfont className
$ auto-iconfont -f autofont
$ auto-iconfont --fontName autofont

# Specify custom config file
$ auto-iconfont -f .customConfig.js
$ auto-iconfont --config .customConfig.js
```
