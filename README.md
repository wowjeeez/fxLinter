# fxLinter

A little utility tool to lint common performance issues in FiveM or RedM scripts

The package you download from npm/yarn is the CLI build.

# FiveM build

1. Clone this repository
2. Inside that folder run `yarn` 
3. After you installad all the dependencies, run `yarn build-fivem` 
4. Start the resource using `start fxLinter`

# API

fxLinter exposes a server event (`fxLinter:lint`), to lint any folder.<br>
Args:<br>
path: `string` The folder to lint <br>
ignores: `string, string` Folders, files, names to ignore (such as node_modules, .git etc)<br>
callback: an array containing all the linting results.<br>
Array strucutre: <br>
```ts
[{
  rule: string, // the rule name
  line: number, // the line number
  lineTxt: string, // the line itself
  file: string, // the file path
  level: "warn" | "error" | "off" // severity of the issue
}, /* more results here*/]
```
<br>
To get a humanly readalbe text for the errors, you can use the `fxLinter:getLocale` event (server) <br>
Args: <br>
rule: `string` the rule name <br>
locale: `string` the locale code (default is `en`) WIP
callback: the locale string 