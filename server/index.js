 const keys = require('./keys');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended : true }))
app.use(express.json());

const { Pool } = require('pg');

const pgClient = new Pool({
    user: keys.pgUser,
    host : keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})
pgClient.on('error',() => console.log('Error connecting to PG client'));

pgClient.on("connect", (client) => {
    client
      .query("CREATE TABLE IF NOT EXISTS values (number INT)")
      .catch((err) => console.error(err));
});

