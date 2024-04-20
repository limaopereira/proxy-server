import express  from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY;
const app = express();

app.use(cors());

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

app.listen(3000, () => {
    console.log("Listening on port 3000");
})
