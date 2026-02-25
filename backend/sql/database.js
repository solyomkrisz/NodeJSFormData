const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'formdatafeladatok',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM exampletable;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function selectbooks() {
    const query = 'SELECT cim, szerzo, kiado, kiadas_eve, mufaj, ar FROM konyvek';
    const [rows] = await pool.execute(query);
    return rows;
}

async function insertbook(d) {
    const query =
        'INSERT INTO konyvek (cim, szerzo, kiado, kiadas_eve, mufaj, ar) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(query, [
        d.cim,
        d.szerzo,
        d.kiado,
        d.kiadas_eve,
        d.mufaj,
        d.ar
    ]);
    return result;
}

//!Export
module.exports = {
    selectall,
    selectbooks,
    insertbook
};
