

const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const { json } = require("./utils");

const { log } = console;

function generateManifest(fontName, srcDir) {
    const svgRootPath = path.join(process.cwd(), srcDir);
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

function writeIndex(fontName, destDir) {
    const content = `import "./${fontName}.css";\nexport { default as Manifest } from "./manifest";`;
    return new Promise(resolve => {
        const filePath = path.join(process.cwd(), destDir, "./index.js")
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

function manifest(config, done) {
    const { fontName, srcDir, destDir } = config;
    log(chalk.green("start generate manifest"));
    generateManifest(fontName, srcDir).then(manifest => {
        const content = `export default ${json(JSON.stringify(manifest))}`;
        const filePath = path.join(process.cwd(), destDir, "manifest.js")
        fs.writeFile(filePath, content, function (err) {
            if (err) {
                log(chalk.red("generate manifest failed" + err));
            } else {
                log(chalk.green("generate manifest success"));
            }

            writeIndex(fontName, destDir).then(done);
        });
    });
}

module.exports = manifest;