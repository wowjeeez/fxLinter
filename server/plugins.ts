import { FileResult } from "./typings";

const rules = new Map<string, ((line: string, idx: number, file: string) => FileResult | null)>()

rules.set("vector-math-only", (line: string, idx: number, file: string): FileResult | null => {
  if (line.includes("GetDistanceBetweenCoords")) {
    return {line: idx, file, rule: "vector-math-only", level: "error"}
  }
  return null
})

rules.set("favor-keybindings", (line: string, idx: number, file: string): FileResult | null => {
  if (line.includes("IsControlJustPressed") || line.includes("IsControlJustReleased")) {
    return {line: idx, file, rule: "favor-keybindings", level: "error"}
  }
  return null
})

rules.set("no-object-calls", (line: string, idx: number, file: string): FileResult | null => {
  if (line.includes("Citizen.Wait") || line.includes("Citizen.CreateThread") || line.includes("Citizen.SetTimeout")) {
    return {line: idx, file, rule: "no-object-calls", level: "error"}
  }
  return null
})

rules.set("no-RegisterServerEvent", (line: string, idx: number, file: string): FileResult | null => {
  if (line.includes("RegisterServerEvent")) {
    return {line: idx, file, rule: "no-RegisterServerEvent", level: "error"}
  }
  return null
})

rules.set("limit-in-sql-calls", (line: string, idx: number, file: string): FileResult | null => {
  if (line.match(new RegExp("mysql", "i"))) {
    if (line.match(new RegExp("SELECT", "i")) && line.match(new RegExp("WHERE", "i")) && !line.match(new RegExp("LIMIT", "i"))) {  
      return {line: idx, file, rule: "limit-in-sql-calls", level: "warn"}
    }
  } 
  return null
})

export default rules