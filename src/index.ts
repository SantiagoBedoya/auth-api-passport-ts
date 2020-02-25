import { App } from "./app";
import "./database";

async function main() {
  const app = new App(3000);
  await app.listen();
}
main();
