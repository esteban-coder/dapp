// Third Party Dependencies.
import { parse } from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  // Env Config Format.
  private readonly envConfig: { [key: string]: string };

  constructor() {
    // Environment.
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    // Check if environment is development.
    if (isDevelopmentEnv) {
      // Path to .env file and check if it exists.
      const envFilePath = __dirname + '/../../.env.development';
      const existPath = fs.existsSync(envFilePath);

      // If it does not exist, exit the process.
      if (!existPath) {
        console.log('.env.development file does not exist');
        process.exit(0);
      }

      // If it does exist, parse the file.
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      // If it is not development, use the environment variables.
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  /**
   * @memberof ConfigService
   * @description Get a value from the environment.
   * @param key The key to get the value from.
   * @returns The value from the environment.
   */
  get(key: string): string {
    // Return the value from the environment.
    return this.envConfig[key];
  }
}
