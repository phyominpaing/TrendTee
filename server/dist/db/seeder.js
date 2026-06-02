import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { products } from "./data.js";
async function seed() {
    try {
        await mongoose.connect("mongodb://localhost:27017/trendtee-project");
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("✅ Products seeded!");
        process.exit();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
seed();
//# sourceMappingURL=seeder.js.map