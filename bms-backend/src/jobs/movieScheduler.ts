import cron from "node-cron";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export const initMovieScheduler = () => {
  // Schedule this to run every day at midnight: '0 0 * * *'
  // Schedule this to run every 2 days at midnight: '0 0 */2 * *'
  // (For testing right now, you can temporarily use '* * * * *' for every minute)
  cron.schedule("* * * * *", async () => {
    try {
      // Execute your npm seed scripts sequentially
      await execPromise("npm run seed1");

      await execPromise("npm run seed2");

      await execPromise("npm run seed3");

      console.log("Successfully refreshed future movies, theaters, and shows.");
    } catch (error) {
      console.error("Error running automated seeding scripts:", error);
    }
  });

  console.log("Movie auto-renewal cron scheduler initialized.");
};
