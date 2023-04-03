import { Client } from 'pg';
import { getDatabaseUri } from './config';

export let db: {
    query: any;
    connect: () => void;
};

if (process.env.NODE_ENV === 'production') {
    db = new Client({
        connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {
    db = new Client({
        connectionString: getDatabaseUri(),
    });
}

db.connect();
