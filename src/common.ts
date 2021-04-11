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