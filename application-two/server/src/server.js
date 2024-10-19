import app from "./app.js";
import { PORT } from "./config/server.config.js";

app.listen(PORT, async () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
