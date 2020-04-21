#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const path = require("path");

const utils = require("./src/utils");
const package = require("./package.json");

const { version } = package;
const { log } = console;
const { isString } = utils;

program
    .version(version, '-v, --verison')
    .option('-s, --srcDir [srcDir]', 'Source directory (relative to root)')
    .option('-d, --destDir [destDir]', 'Build directory (relative to root)')
    .option('-f, --fontName [fontName]', 'iconfont css className')
    .option('-c, --config [configFile]', 'config file path(relative to root)')
    .parse(process.argv);

const { srcDir, destDir, fontName, config } = program;

if (config && (srcDir || destDir || fontName)) {
    log(chalk.red("Cannot specify both a configuration file and a property configuration(srcDir | destDir | fontName)"));
    return;
}

const defaultConfig = require("./.autoicon.config");
let customDefaultConfig = null;

try {
    customDefaultConfig = require(path.resolve(process.cwd(), ".autoicon.config"))
} catch (error) {

}

let finalConfig = { ...(customDefaultConfig || defaultConfig) };

if (config) {
    if (typeof config === "string") {
        const customConfigPath = path.resolve(process.cwd(), config);
        try {
            const customConfig = require(customConfigPath);
            finalConfig = customConfig;
        } catch (error) {
            log(chalk.red(error));
            return;
        }
    } else {
        log(chalk.red("Config requires parameters of type string"));
    }
}


if (fontName) {
    if (!isString(fontName)) {
        log(chalk.red("fontName requires parameters of type string"))
        return;
    }
    Object.assign(finalConfig, { fontName });
}

if (srcDir) {
    if (!isString(srcDir)) {
        log(chalk.red("srcDir requires parameters of type string"))
        return;
    }
    Object.assign(finalConfig, { srcDir });
}

if (destDir) {
    if (!isString(destDir)) {
        log(chalk.red("destDir requires parameters of type string"))
        return;
    }
    Object.assign(finalConfig, { destDir });
}

const clear = require("./src/clear");
const manifest = require("./src/manifest");
const iconfont = require("./src/iconfont");


async function build() {
    await clear(finalConfig.destDir).catch(e => {
        throw new Error(e);
    })

    iconfont(finalConfig, () => {
        manifest(finalConfig, () => {
            log(chalk.green("generate iconfont success"));
        })
    })
}

build();
