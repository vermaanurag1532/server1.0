import mysql from 'mysql2';

function handleDisconnect() {
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'Anurag@1532',
        database: 'mydatabase'
    });

    connection.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL:', err.stack);
            setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
        } else {
            console.log('Connected to MySQL as id', connection.threadId);
        }
    });

    connection.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconnect on lost connection
        } else {
            throw err;
        }
    });

    return connection;
}

const connection = handleDisconnect();
export default connection;

