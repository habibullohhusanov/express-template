import userSeeder from "./userSeeder.js";
import connect from "../config/dbConfig.js";

const seeder = async () => {
    try {
        connect();

        await userSeeder();
    } catch (error) {
        console.log(error)
    }
}

seeder();