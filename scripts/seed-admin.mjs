import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const { default: dbConnect } = await import('../backend/lib/mongodb.js');
const { default: Admin } = await import('../backend/models/Admin.js');

async function seedAdmin() {
    await dbConnect();
    console.log("Connected to DB...");

    const existing = await Admin.findOne({ username: 'omnamashivaya' });
    if (!existing) {
        await Admin.create({
            username: 'omnamashivaya',
            password: 'shivaya@123',
            recoveryEmail: 'admin@digitalpower.in'
        });
        console.log("Admin seeded: omnamashivaya / shivaya@123");
    } else {
        console.log("Admin already exists.");
    }
    process.exit(0);
}

seedAdmin().catch(err => {
    console.error(err);
    process.exit(1);
});
