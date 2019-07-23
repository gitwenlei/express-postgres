const pg = require('pg');
// Init express app
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Initialise postgres client
const config = {
  user: 'fishie',
  host: '127.0.0.1',
  database: 'exdb',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});




app.get('/', (request, response) => {

    const queryString = 'SELECT * FROM students';

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            console.log('query result:', result);
            // redirect to home page
            response.send( result.rows );
        }
    });
});

const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));