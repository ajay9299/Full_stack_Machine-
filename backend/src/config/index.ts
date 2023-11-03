import { config } from "dotenv";
import path from "path";

export class AppConfig {
  private static instance: AppConfig;
  private static envType: string;
  private constructor() {}

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  public static getConfigOfApplication(): any {
    this.envType = process.env.NODE_ENV || "dev";

    // Load environment variables based on selected environment ( for example dev,stag,prod)
    config({ path: path.join(__dirname, `../../.env.${this.envType}`) });
    return {
      SERVER_PORT: Number(process.env.SERVER_PORT),
      DB_URL: process.env.DB_URL,
    };
  }
}
