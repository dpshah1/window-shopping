import React from 'react'
import { MongoClient as Client } from 'mongodb'



export default async function StorePage() {
  const client = new Client(process.env.DATABASE_KEY)
  await client.connect()
  const dbName = "window-shopping";
  const collectionName = "stores";
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const findQuery = { prepTimeInMinutes: { $lt: 45 } };

  try {
    const cursor = await collection.find();
    await cursor.forEach(store => {
      console.log(`${store.name} store name`);
    });
    // add a linebreak
    console.log();
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }


  return (
    <div>signin page</div>
  )
}
