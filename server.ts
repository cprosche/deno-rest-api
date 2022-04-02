import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import router from "./routes.ts";
const port = 8000;

const app = new Application();

console.log(`Listening on http://localhost:${port}`);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port });
