import "dotenv/config";
import { createApp } from "./server/app.js";

const port = Number(process.env.PORT) || 5173;

const app = await createApp();
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
