import { Runtime } from "./typings";
import fs from "fs"
type keyedObject = { [key: string]: string }

const en: keyedObject = JSON.parse(fs.readFileSync(`${__dirname}/locales/en.json`).toString()) // temporary solution
const locales = new Map<string, keyedObject>()

locales.set("en", en)

export function isSubInArray(arr: string[], text: string): boolean {
  let val = false //if I didnt utilize this var it always returned false idk why im dumb
  arr.forEach((elem: string) => {
    if (text.includes(elem)) {
      val = true
    }
})
return val
}

export function parseIgnores(text: string): string[] {
  if (text.includes(",")) {
    const stage = text.replace(/\s/g, '').split(",")
    return stage
  } else {
    if (text.length > 0) {
      return [text]
    } else {
      return [""]
    }
  }
}

export function getRuntime(file: string): Runtime {
  const runtime = file.match(/[^\.]*$/)
  if (runtime) {
    return runtime.toString() as Runtime
  } else {
    return "none"
  }
}

export function getLocale(rule: string, locale = "en"): string {
  if (locales.has(locale)) {
    return (locales as any).get(locale)[rule]
  } else {
    return "NO LOCALE FOUND"
  }
}