import fs from "fs";
import readline from "readline";
import { getFiles } from "./iterator";
import { isSubInArray } from "./common";
import { FileResult } from "./typings";
import { checkLine } from "./rules";
import chalk from "chalk";

async function getFilePaths(dir: string, ignore: string[]): Promise<string[]> {
  const result: string[] = []
  return new Promise<string[]>(async (resolve, reject) => {
    for await (const f of getFiles(dir)) {
      if (!isSubInArray(ignore, f as string) && (f as string).includes(".") && !(f as string).includes("\\.")) {
        result.push(f as string)
      }
    }
    resolve(result)
  })
}

function analyzeFile(path: string): Promise<FileResult[]> {
  return new Promise<FileResult[]>((resolve, reject) => {
    const line_counter = ((i = 0) => () => ++i)();
    const readInterface = readline.createInterface(fs.createReadStream(path));
    const lineResults: Array<FileResult[] | null[]> = []
    readInterface.on('line', function (line, lineno = line_counter()) {
      const res = checkLine(line, lineno, path).filter((el) => el != null && el != undefined)
      if (res) {
        lineResults.push(res);
      }
    });
    readInterface.on("close", () => {
      const resolvable = lineResults.filter(el => el.length > 0).flat().flat()
      resolve(resolvable as unknown as FileResult[])
    })
  })
}



export async function analyze(dir: string, ignore: string[]): Promise<FileResult[]>  {
  return new Promise<FileResult[]>((resolve, reject) => {
    getFilePaths(dir, ignore).then((files: string[]) => {
      const result: FileResult[][] = []
      files.forEach(async (file: string, idx: number) => {
        result.push(await analyzeFile(file))
        if (idx == files.length - 1) {
          resolve(result.flat())
        }
      })
    })
  })
}
//TEST:
analyze("D:/prog/tests/esx_garage", [".git", "locales", "config.lua", "fxmanifest.lua", ".md", ".sql"]).then(res => console.log(res))
try {
  onNet("fxLinter:lint", async (path: string, ignore: string[], cb: (res: FileResult[]) => void) => {
    const res = await analyze(path, ignore)
    cb(res)
  })
} catch (err) {
  console.log(chalk.yellow("CLI build detected"))
}
