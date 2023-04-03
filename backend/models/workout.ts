import { db } from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} from '../errors/expressError';

class Workout {
    static async create({ nickname, equipment, split, frequency }) {
        const result = await db.query(
            `INSERT INTO workout
			(nickname, equipment, split, frequency)
			VALUES ($1, $2, $3, $4)
			RETURNING nickname, equipment, split, frequency`,
            [nickname, equipment, split, frequency]
        );
        const workout = result.rows[0];
        return workout;
    }

    static async findAll() {
        const results = await db.query(`SELECT * from workout `);
    }
}
