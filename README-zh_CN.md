# automatic-iconfont

通过SVG文件生成iconfont

[English](./README.md) | 简体中文

## 📦 开始

```bash
npm install 
```

```bash
yarn install
```

## 🔨 用法

1.在`svgs`目录下创建一个文件夹表示icon的分类.

2.将svg文件放入刚才创建的文件夹中.

3.执行`build`命令：

```bash
npm run build 
```

```bash
yarn run build
```

## ⚙️ 配置

在`.autoicon.config.js`文件中自定义构建相关配置

```js
module.exports = {
    fontName: "autofont", // iconfont css className
    srcDir: "svgs", // 源文件目录 (相对于根目录)
    destDir: "dist" // 生产目录 (相对于根目录)
}
```