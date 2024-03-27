import { db } from './config/postgres'

async function setup(){
    await db/*sql*/`CREATE TABLE IF NOT EXISTS short_links(
            id SERIAL PRIMARY KEY,
            code TEXT,
            original_url TEXT,
            owner TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `
   
    await db.end()

    console.log('Database setup finished successfully.')
}

setup()