import express  from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClientAsync } from 'soap';

dotenv.config();
const apiKey = process.env.API_KEY;
const app = express();

app.use(cors());

const holidayUrl = 'https://services.sapo.pt/Metadata/Contract/Holiday?culture=PT';

app.get("/api/benficaHomeScheduledGames", async (req, res) => {
    const response = await fetch(
        'https://api.football-data.org/v4/teams/1903/matches?status=SCHEDULED&venue=HOME',
        {
            method: 'GET',
            headers: {
                'X-Auth-Token' : apiKey
            }
        }
    );
    res.json(await response.json())
});

app.get("/api/holidays/:year", async (req, res) => {
    try {
        const client = await createClientAsync(holidayUrl);
        const [result] = await client.GetAllHolidaysAsync({year: parseInt(req.params.year)});
        res.json(result);
    }
    catch(error){
        console.error('Error fetching holidays:', error);
        res.status(500).json({ error: 'An error occurred while fetching holidays' });
    }
})


app.listen(8080, () => {
    console.log("Listening on port 8080");
})
