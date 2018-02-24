import someDefault, {greetUser, name} from "../imports/utils";

console.log("Log from /client/main.js");
console.log(greetUser() + " " + name);
console.log(someDefault);