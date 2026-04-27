import { MongoClient } from 'mongodb';

// Configuration
const LOCAL_URI = 'mongodb://localhost:27017';
const ATLAS_URI = 'mongodb://santhoshpalanivel00_db_user:PusWdNpZZ1gfcm18@ac-ulwho7b-shard-00-00.ju9oe7h.mongodb.net:27017,ac-ulwho7b-shard-00-01.ju9oe7h.mongodb.net:27017,ac-ulwho7b-shard-00-02.ju9oe7h.mongodb.net:27017/digital_power?ssl=true&replicaSet=atlas-1py6yj-shard-0&authSource=admin&appName=Cluster0';
const DB_NAME = 'digital_power';

async function migrate() {
  const localClient = new MongoClient(LOCAL_URI);
  const atlasClient = new MongoClient(ATLAS_URI);

  try {
    console.log('🔗 Connecting to Local and Atlas databases...');
    await localClient.connect();
    await atlasClient.connect();
    console.log('✅ Connected!');

    const localDb = localClient.db(DB_NAME);
    const atlasDb = atlasClient.db(DB_NAME);

    const collections = ['admins', 'customers', 'inventory', 'orders', 'products'];

    for (const colName of collections) {
      console.log(`📦 Migrating collection: ${colName}...`);
      const data = await localDb.collection(colName).find({}).toArray();
      
      if (data.length > 0) {
        // Clear Atlas collection first to avoid duplicates
        await atlasDb.collection(colName).deleteMany({});
        // Insert local data
        await atlasDb.collection(colName).insertMany(data);
        console.log(`✅ Migrated ${data.length} items from ${colName}!`);
      } else {
        console.log(`⚠️ Collection ${colName} is empty, skipping.`);
      }
    }

    console.log('\n✨ MIGRATION COMPLETE! Your Live site is now synced with your Local data.');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    await localClient.close();
    await atlasClient.close();
  }
}

migrate();
