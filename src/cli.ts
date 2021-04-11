#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv
import chalk from "chalk";
import inquirer from "inquirer";
import { parseIgnores, getLocale } from "./common";
import { analyze } from "./core";

import { FileResult } from "./typings";

console.log(chalk.yellow(`Welcome to ${chalk.bold("fxLinter")} (cli build)!`))
inquirer.prompt([{
  type: "input",
  name: "path",
  default: process.cwd(),
  message: "Input your resource path!"
}, {
    type: "input",
    name: "ignores",
    default: "node_modules, .git, .md, .sql",
    message: "Input the folders, file that you want to ignore while linting!"
  }]).then(async (answers) => {
    const path = answers["path"].replace("//", "\\")
    const ignores = parseIgnores(answers["ignores"])
    console.log(chalk.yellow("Linting files..."))
    const result = await analyze(path, ignores)
    //TODO! parse results correctly
    result.forEach((res: FileResult) => {
      console.log(chalk[res.level == "error" ? "red" : "yellow"](getLocale(res.rule)))
      console.log(`${chalk.white(`[${res.file.replace("\\", "/")}]:${res.line}`)} ${chalk.cyan(res.lineTxt.replace(/\s/g, ' '))}`)
      console.log("\n\n")
    })
})