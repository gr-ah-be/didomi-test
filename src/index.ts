import { buildApplication } from './app';
import './database/connection';
import { logger } from './config/logger';
import { Server } from 'http';
import { initSequelize } from './database/sequelize-instance-manager';

const port = process.env.PORT || 3111;

// Gracefully handle shutdown
async function exitGracefully(
  server: Server,
  eventName: NodeJS.Signals | 'uncaughtException',
  exitCode: number,
  error?: Error,
) {
  const sequelize = await initSequelize();
  if (error) {
    logger.error(error);
  }
  logger.info(`${eventName} signal received. Closing server...`, {
    exitCode,
  });
  server.close();
  await sequelize.close();
  logger.info('Gracefully closed server');
  process.exit(exitCode);
}

async function startServer() {
  try {
    // Start the server
    const server = buildApplication(logger).listen(port, () => {
      logger.info(`[server]: Server is running at http://localhost:${port}`);
    });

    // Gracefully handle shutdown
    process.on('SIGINT', () => exitGracefully(server, 'SIGINT', 0));
    process.on('SIGTERM', () => exitGracefully(server, 'SIGTERM', 0));
    process.on('uncaughtException', (err) =>
      exitGracefully(server, 'uncaughtException', 1, err),
    );
  } catch (err) {
    logger.error('Failed to start the server:', err);
    process.exit(1); // Exit with error code
  }
}

startServer();
