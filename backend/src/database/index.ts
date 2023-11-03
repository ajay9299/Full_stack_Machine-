import { Connection, createConnection, connect } from "mongoose";
import { AppConfig } from "../config";
import { globalMessages } from "../constants/messages";
import { error } from "console";

/**
 * Database class handle all the functionalities related to database connection
 */
export class Database {
  private static instance: Database;

  private constructor() {
    // Load db url from config file
    const { DB_URL } = AppConfig.getConfigOfApplication();
    // Connect to MongoDB
    connect(DB_URL)
      .then(() => {
        console.log(globalMessages.databaseConnected);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * @returns Newly or exiting instance of Database class
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
