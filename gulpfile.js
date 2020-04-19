/*
 * @Author: wujingfei 00718
 * @Date: 2020-01-03 14:37:30
 * @Description: Description
 */

const gulp = require("gulp");
const iconfont = require("gulp-iconfont");
const iconfontCss = require("gulp-iconfont-css");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const config = require("./.autoicon.config");
const json = require("./utils/json")

const { log } = console;
const { fontName, srcDir, destDir } = config;

gulp.task("generate-manifest", function (done) {
    log(chalk.green("start generate manifest"));
    generateManifest().then(manifest => {
        const content = `export default ${json(JSON.stringify(manifest))}`;
        const filePath = path.join(__dirname, destDir, "manifest.js")
        fs.writeFile(filePath, content, function (err) {
            if (err) {
                log(chalk.red("generate manifest failed" + err));
            } else {
                log(chalk.green("generate manifest success"));
            }

            writeIndex().then(done);
        });
    });
});

gulp.task("iconfont", function (done) {
    let svg = path.resolve(__dirname, srcDir, "./**/*.svg");

    gulp.src(svg)
        .pipe(
            iconfontCss({
                fontName,
                cssClass: fontName,
                targetPath: `${fontName}.css`, //生成的css样式的路径
                fontPath: "./", //生成的iconfont的路径
            })
        )
        .pipe(
            iconfont({
                fontName, // required
                prependUnicode: true, // recommended option
                formats: ["ttf", "eot", "woff", "woff2", "svg"], // default, 'woff2' and 'svg' are available
                timestamp: new Date().getTime(),
                normalize: true,
                fontHeight: 2048,
                options: {
                    fontHeight: 2048,
                    fontStyle: "normal",
                    normalize: true,
                },
            })
        )
        .pipe(gulp.dest(path.resolve(__dirname, destDir)).on("finish", done));
});

gulp.task("clear", clear)

gulp.task("build", gulp.series("clear", "iconfont", "generate-manifest"));

function clear(resolve) {
    rimraf(path.resolve(__dirname, destDir), error => {
        if (error) {
            throw new Error(error);
        } else {
            resolve();
        }
    })
}

/**
 * 生成文件声明所有的iconfont className, 用于使用文档等的撰写
 */
function generateManifest() {
    const svgRootPath = path.join(__dirname, srcDir);
    const manifest = {};

    return new Promise(resolve => {
        fs.readdir(svgRootPath, function (err, dirs) {
            if (dirs && dirs.length > 0) {
                dirs.forEach(function (dirName, index) {
                    const dirPath = path.join(svgRootPath, dirName);
                    fs.readdir(dirPath, function (errs, svgFiles) {
                        if (!errs && svgFiles.length > 0) {
                            const fileNames = svgFiles.map(
                                x => `${fontName}-${x.replace(/.svg/g, "")}`
                            );
                            manifest[dirName] = fileNames;

                            if (index === dirs.length - 1) {
                                resolve(manifest);
                            }
                        }
                    });
                });
            }
        });
    });
}

function writeIndex() {
    const content = `import "./${fontName}.css";\nexport { default as Manifest } from "./manifest";`;
    return new Promise(resolve => {
        const filePath = path.join(__dirname, destDir, "./index.js")
        fs.writeFile(filePath, content, function (err) {
            if (err) {
                log(chalk.red("generate index failed" + err));
            } else {
                log(chalk.green("generate index success"));
            }
            resolve();
        });
    });
}


