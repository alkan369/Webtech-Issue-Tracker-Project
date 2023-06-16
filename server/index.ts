import { config } from 'dotenv';
import express, { Application, json } from "express";
import { ConnectOptions, connect } from 'mongoose';
import { connect as connectAPI } from "./api/connect";
import path from 'path';
import bodyParser from 'body-parser';

config()

const app: Application = express();

app.use(json());

connectAPI(app, '/api');

const PORT = process.env.PORT || 3001;
const DB_CONNECTION = process.env.DB_CONNECTION_STRING;

app.use(express.static(path.join(__dirname, '../../issue-tracker/build')));
app.use(bodyParser.json());
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../issue-tracker/build', 'index.html'));
});

app.listen(PORT, () => {
    connect(DB_CONNECTION as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log(`Server listening on port ${PORT}`))
    .catch(error => console.log(error + "from error"));
})