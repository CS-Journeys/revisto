import logger from "./utils/logger.js";
import db from "./db/connection.js";
import app from "./app.js";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
