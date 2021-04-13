import { FileResult } from "./typings";

const rules = new Map<string, ((line: string, idx: number, file: string, runtime: string) => FileResult | null)>()

rules.set("vector-math-only", (line: string, idx: number, file: string): FileResult | null => {
  if (line.includes("GetDistanceBetweenCoords")) {
    return {line: idx, file, rule: "vector-math-only", lineTxt: line, level: "error"}
  }
  return null
})

rules.set("favor-keybindings", (line: string, idx: number, file: string): FileResult | null => {
  if (line.includes("IsControlJustPressed") || line.includes("IsControlJustReleased")) {
    return {line: idx, file, rule: "favor-keybindings", lineTxt: line, level: "error"}
  }
  return null
})

rules.set("no-object-calls", (line: string, idx: number, file: string, runtime: string): FileResult | null => {
  if (line.includes("Citizen.Wait") || line.includes("Citizen.CreateThread") || line.includes("Citizen.SetTimeout") && runtime == "lua") {
    return {line: idx, file, rule: "no-object-calls", lineTxt: line, level: "error"}
  }
  return null
})

rules.set("no-RegisterServerEvent", (line: string, idx: number, file: string, runtime: string): FileResult | null => {
  if (line.includes("RegisterServerEvent") && runtime == "lua") {
    return {line: idx, file, rule: "no-RegisterServerEvent", lineTxt: line, level: "error"}
  }
  return null
})

rules.set("limit-in-sql-calls", (line: string, idx: number, file: string): FileResult | null => {
  if (line.match(new RegExp("mysql", "i"))) {
    if (line.match(new RegExp("SELECT", "i")) && line.match(new RegExp("WHERE", "i")) && !line.match(new RegExp("LIMIT", "i"))) {  
      return {line: idx, file, rule: "limit-in-sql-calls", lineTxt: line, level: "warn"}
    }
  } 
  return null
})

rules.set("no-get-player-ped-for-local", (line: string, idx: number, file: string): FileResult | null => {
  if (line.includes("GetPlayerPed(-1)") || line.includes("GetPlayerPed(PlayerId())")) {
    return {line: idx, file, rule: "no-get-player-ped-for-local", lineTxt: line, level: "error"}
  }
  return null
})

rules.set("no-get-player-ped", (line: string, idx: number, file: string): FileResult | null => {
  if (line.includes("GetPlayerPed")) {
    return {line: idx, file, rule: "no-get-player-ped", lineTxt: line, level: "warn"}
  }
  return null
})

rules.set("use-fxmanifest", (line: string, idx: number, file: string) => {
  if (file.includes("__resource.lua")) {
    return {line: idx, file, rule: "use-fxmanifest", lineTxt: line, level: "error"}
  }
  return null
})
rules.set("src", (line: string, idx: number, file: string) => {
  if (line.match(new RegExp("local\s*source\s*=\s*source"))) {
    return {line: idx, file, rule: "src", lineTxt: line, level: "warn"}
  }
  return
})

export default rules