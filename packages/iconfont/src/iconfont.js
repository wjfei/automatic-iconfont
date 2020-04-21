
const gulp = require("gulp");
const gulpIconfont = require("gulp-iconfont");
const iconfontCss = require("gulp-iconfont-css");
const path = require("path");


function iconfont(config, done) {
    const { fontName, srcDir, destDir } = config;
    let svg = path.resolve(process.cwd(), srcDir, "./**/*.svg");

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
            gulpIconfont({
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
        .pipe(gulp.dest(path.resolve(process.cwd(), destDir)).on("finish", done));
}

module.exports = iconfont;