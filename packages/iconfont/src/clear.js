const rimraf = require("rimraf");
const path = require("path");

function clear(destDir) {
    const destPath = path.resolve(process.cwd(), destDir)
    return new Promise((resolve, reject) => {
        rimraf(destPath, err => {
            if (!err) {
                resolve();
            } else {
                reject(reject);
            }
        })
    })

}

module.exports = clear;