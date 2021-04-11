export function isSubInArray(arr: string[], text: string): boolean {
  let val = false //if I didnt utilize this var it always returned false idk why im dumb
  arr.forEach((elem: string) => {
    if (text.includes(elem)) {
      val = true
    }
})
return val
}