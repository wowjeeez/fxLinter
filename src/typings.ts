export interface FileResult {
  rule: string,
  line: number,
  file: string,
  level: "warn" | "error" | "off"
}