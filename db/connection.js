import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',    
    user: 'root',    
    password: 'Anurag@1532',
    database: 'mydatabase'  
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id', connection.threadId);
});

export default connection;
