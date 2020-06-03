import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'data', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'data', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'data', 'seeds'),
    },
    useNullAsDefault: true,
}