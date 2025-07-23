const mysql = require("mysql2/promise");

class DataBase {
  constructor(user, password, host, port, database) {
    this.user = user;
    this.password = password;
    this.host = host;
    this.port = port;
    this.database = database;
  }

  getConnection() {
    return mysql.createPool({
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
      database: this.database,
    });
  }

  async query(sql, params) {
    let connection = null;
    try {
      connection = await this.getConnection();
      const [rows] = await connection.execute(sql, params);
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
}

module.exports = DataBase;
