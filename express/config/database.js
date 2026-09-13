import mysql from "mysql2/promise";

import {
  DB_NAME,
  DB_PASSWORD,
  DB_SERVER,
  DB_USER,
} from "../config/credentials.js";

export const db = mysql.createPool({
  host: DB_SERVER,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
