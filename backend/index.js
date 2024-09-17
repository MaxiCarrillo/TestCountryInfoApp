import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.get('/countries', async (req, res) => {
    try {
        const response = await fetch(`${process.env.API_DATENAGER}/AvailableCountries`);
        const data = await response.json();
        res.status(200).json({
            meta: {
                status: 200,
                total: data.length
            },
            data
        });
    } catch (error) {
        console.error('It seems that an error has occurred');
        res.status(500).json({
            meta: {
                status: 500,
                message: 'Internal Server Error'
            }
        });
    }
});

app.get('/countries/:countryCode', async (req, res) => {
    try {
        const response = await fetch(`${process.env.API_DATENAGER}/CountryInfo/${req.params.countryCode}`);
        const data = await response.json();

        const responseImage = await fetch(`${process.env.API_COUNTRIESNOW}/flag/images`);
        const dataImage = await responseImage.json();
        data.flag = dataImage.data.find(country => country.name === data.commonName).flag || 'No data available';

        const responsePopulation = await fetch(`${process.env.API_COUNTRIESNOW}/population`);
        const dataPopulation = await responsePopulation.json();
        data.population = dataPopulation.data.find(country => country.country === data.commonName).populationCounts || 'No data available';

        res.status(200).json({
            meta: {
                status: 200,
            },
            data
        });

    } catch (error) {
        console.error('It seems that an error has occurred');
        res.status(500).json({
            meta: {
                status: 500,
                message: 'Internal Server Error'
            }
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});