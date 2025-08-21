import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "../config/db.js";

dotenv.config();

await sequelize.sync({ alter: true });

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();
