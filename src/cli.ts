#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv
import chalk from "chalk";

console.log(chalk.yellow("Welcome!"))
