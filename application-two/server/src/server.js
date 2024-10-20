import app from "./app.js";
import { PORT } from "./config/server.config.js";
import {
  startCronJob,
  startCronAggregation,
  startCronNofications,
} from "./services/server.services.js";

app.listen(PORT, async () => {
  console.log(`App is running at http://localhost:${PORT}`);
  await startCronJob(); // for weather data
  await startCronAggregation(); // for aggregation
  await startCronNofications(); // for notifications
});
