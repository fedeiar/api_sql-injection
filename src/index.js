const express = require('express');
const app = express();
require('dotenv').config()
const pool = require("./dbConnection.js");
const escape = require('pg-escape');

app.get('/', (request, response) => {
    response.send("Welcome to the API!");
});

app.get('/initialize_database', async (request, response) => {
    try{
        const query = `CREATE TABLE IF NOT EXISTS users (
                username varchar(45) NOT NULL,
                email varchar(450) NOT NULL,
                PRIMARY KEY (username) 
            )`;
        await pool.query(query);
        await pool.query("DELETE FROM users WHERE username = 'john' ");
        await pool.query("INSERT INTO users(username, email) VALUES ('john', 'john@mail.com')");
        await pool.query("DELETE FROM users WHERE username = 'jack' ");
        await pool.query("INSERT INTO users(username, email) VALUES ('jack', 'jack@mail.com')");
        await pool.query("DELETE FROM users WHERE username = 'peter' ");
        await pool.query("INSERT INTO users(username, email) VALUES ('peter', 'peter@mail.com')");
        response.status(200).json({"message": "table created succesfully."});
    } catch(error){
        response.status(500).json({"message": error.message});
    }
});

app.get('/users', async (request, response) => {
    try{
        const query = "SELECT * FROM users";
        const result = await pool.query(query);
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"message": error.message});
    }
});

app.get('/users/:username', async (request, response) => {
    let username = request.params.username;
    try{
        const query = `SELECT * FROM users WHERE username='${username}'`;
        console.log(query);
        const result = await pool.query(query);
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"message": error.message});
    }
});

app.get('/protected_users/:username', async (request, response) => {
    let username = request.params.username;
    try{
        const query = `SELECT * FROM users WHERE username=${escape.literal(username)}`;
        console.log(query);
        const result = await pool.query(query);
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"message": error.message});
    }
});


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Listening on port '+PORT+'...'));