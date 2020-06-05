const sqlite = require('sqlite3').verbose();

const conn = new sqlite.Database('./src/data/database.db');

// conn.serialize(() => {
//     conn.run(`CREATE TABLE IF NOT EXISTS places (
//         id INTEGER PRIMARY KEY AUTOINCREMENT
//         , image TEXT
//         , name TEXT
//         , address TEXT
//         , address2 TEXT
//         , state TEXT
//         , city TEXT
//         , itens TEXT
//         );`
//     );


//     function handleQuery(err, rows) {
//         if (err) console.log(err);
//         console.log(rows);
//     }
//     conn.all(`SELECT name FROM places`, handleQuery);

//     conn.run('DELETE FROM places WHERE id = ?', [1]);

//     conn.all(`SELECT * FROM places`, handleQuery);
// })

module.exports = conn;