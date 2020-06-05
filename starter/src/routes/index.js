const express = require('express');
const conn = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    return res.render('index.html');
});

router.get('/create-point', (req, res) => {
    return res.render('create-point.html');
});

router.post('/save', (req, res) => {
    const data = req.body;
    const query = `INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        itens
    ) VALUES (?, ?, ?, ?, ?, ?, ?);`
    const values = [
        'teste.svg',
        data.nome,
        data.address,
        data.number,
        data.state,
        data.city,
        data.itens
    ];
    
    function handleInsert(err){
        if (err) return console.log(err);
        console.log('Sucess!')
        return res.redirect('/search');
    }

    conn.run(query, values, handleInsert);
});

router.get('/search', (req, res) => {
    const search = req.query.search;

    if (search === ''){
        return res.render('search-results.html', { total: 0 });
    }

    conn.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, (err, rows) => {
        if (err) return console.log(err);
        return res.render('search-results.html', { 
            places: rows,
            total: rows.length,
        } );
    });
});

module.exports = router;