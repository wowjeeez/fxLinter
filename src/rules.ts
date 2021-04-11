// you can define your own rules here
import { FileResult } from "./typings";
import rules from "./plugins";
let inComment = false
export function checkLine(line: string, idx: number, file: string): Array<FileResult | null> {
  const res: Array<FileResult | null> = []
  for (const [k, v] of rules) {
    // check for multi line comments
    if (line.includes("/*") || line.includes("--[[")) {
      inComment = true
    } else if (line.includes("*/") || line.includes("--]]")) {
      inComment = false
    }

    if (!line.startsWith("--") && !line.startsWith("//") && !inComment) { // check if line is commented
      res.push(v(line, idx, file))
    } else {
      res.push(null)
    }
  }
  return res
} 