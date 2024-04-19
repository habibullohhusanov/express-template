import userSeeder from "./userSeeder.js";
import connect from "../config/dbConfig.js";

const seeder = async () => {
    try {
        await connect();

        await userSeeder();

        console.log("Seeded");
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(0);
    }
}

seeder();