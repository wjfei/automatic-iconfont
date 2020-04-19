# automatic-iconfont

Iconfont is automatically generated from an SVG file

English | [简体中文](./README-zh_CN.md)

## 📦 Start

```bash
npm install 
```

```bash
yarn install
```

## 🔨 Usage

1.Create a directory representation icon category under the `svgs` directory.

2.Place the SVG file in the folder you created.

3.Execute the `build` command

```bash
npm run build 
```

```bash
yarn run build
```

## ⚙️ Configuration

Custom build-related configuration in the `.autoicon.config.js` file

```js
module.exports = {
    fontName: "autofont", // iconfont css className
    srcDir: "svgs", // Source directory (relative to root)
    destDir: "dist" // Build directory (relative to root)
}
```
