import mysql from 'mysql2/promise';

async function createConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'Anurag',
            password: 'Anurag@1532',
            database: 'mydatabase'
        });
        console.log('Connected to MySQL');
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        setTimeout(createConnection, 2000); // Reattempt connection if it fails
    }
}

const connection = await createConnection();
export default connection;
