import app from "./app.js";
import { PORT } from "./config/server.config.js";
// import { startCronJob } from "./services/server.services.js";

app.listen(PORT, async () => {
  console.log(`App is running at http://localhost:${PORT}`);
  // await startCronJob();
});
