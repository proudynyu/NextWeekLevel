const conn = require('./db');

conn.all('SELECT * FROM places', (err, rows) => {
    if (err) return console.log(err);
    console.log(rows);
});