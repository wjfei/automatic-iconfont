# automatic-iconfont

通过SVG文件生成iconfont

[English](./README.md) | 简体中文

## 📦 安装

```bash
npm install w-automatic-iconfont --save-dev
```

```bash
yarn add w-automatic-iconfont --dev
```
支持全局安装：

```bash
npm install w-automatic-iconfont -g
```

## 🔨 用法

### 📝 配置文件

在您的项目中创建一个配置文件(`.autoicon.config.js`)，内容如下(这也是`automatic-iconfont`的默认配置):

```js
module.exports = {
    fontName: "autofont", // iconfont css className
    srcDir: "svgs", // 源文件目录 (相对于根目录)
    destDir: "dist" // 生产目录 (相对于根目录)
}
```

### ✨ 构建

```bash
# 获取帮助
$ auto-iconfont -h

# 使用默认配置生成iconfont
$ auto-iconfont

# 查看版本
$ auto-iconfont -v

# 指定svg源文件目录
$ auto-iconfont -s svgs
$ auto-iconfont --srcDir svgs

# 指定构建目录
$ auto-iconfont -d dist
$ auto-iconfont --destDir dist

# 指定iconfont class类名
$ auto-iconfont -f autofont
$ auto-iconfont --fontName autofont

# 指定一个自定义配置文件
$ auto-iconfont -f .customConfig.js
$ auto-iconfont --config .customConfig.js
```