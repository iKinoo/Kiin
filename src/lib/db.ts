import mysql from 'mysql2/promise';

// Creamos un "Pool" de conexiones. 
// Es más eficiente que abrir una conexión nueva cada vez.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;