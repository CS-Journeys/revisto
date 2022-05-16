import db from "./core/db/connection.js";
import app from "./app.js";
import logger from "./core/utils/logger.js";
import { startFeaturedPostsUpdateJob } from "./services/featured_posts/featuredPostsUpdateScheduler.js";

const PORT = process.env.PORT || 5000;

// Server startup
startFeaturedPostsUpdateJob();
var server = app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

// Cleanup
process.on('SIGTERM', () => {
  logger.debug('SIGTERM signal received')
  logger.info('Gracefully shutting down http server...');
  server.close((err) => {
    logger.info('Server closed');
    // TODO: clean up database
    process.exit(err ? 1 : 0);
  });
});
