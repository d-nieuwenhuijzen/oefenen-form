import express from 'express';
//config wordt direct aangeroepen op de dotenv import
import {} from 'dotenv/config';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;
//lees de connection string uit de environment file
const databaseUrl = process.env.CONNECTION_URL;
const client = new MongoClient(databaseUrl);

//op de / route geven we de documenten terug uit de MongoDB database
app.get('/', (req, res) => {
    //fetchDocuments() is een async functie dus zullen we met then() moeten werken
    fetchDocuments().then(documents => {
        //in de then() geven we de documenten terug naar de browser in de vorm van json
        res.json(documents);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//Deze functie geeft alle documenten terug uit een collectie in MongoDB
async function fetchDocuments() {
    try {
        // we verbinden de client met de server
        await client.connect();
        //hier verbinden we met de database, je moet nog wel een naam invullen
        const database = client.db('');
        //hier verbinden we met de collectie, je moet nog wel een naam invullen
        const collection = database.collection('');
        //hier halen we de documenten uit de collectie in de vorm van een array
        const documents = await collection.find().toArray();
        //uiteindelijk geven we de documenten terug
        return documents;
    } finally {
        //we zorgen ervoor dat aan het einde de database verbinding weer wordt gesloten
        await client.close();
    }
}

                
            