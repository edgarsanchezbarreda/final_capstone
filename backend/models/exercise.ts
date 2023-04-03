import { db } from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from '../errors/expressError';

class Exercise {
    static async create(
        bodyPart: string,
        equipment: string,
        gifUrl: string,
        id: string,
        name: string,
        target: string
    ) {
        const result = await db.query(
            `INSERT INTO exercise
			(bodyPart, equipment, gifUrl, id, name, target)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING bodyPart, equipment, gifUrl, id, name, target
			`,
            [bodyPart, equipment, gifUrl, id, name, target]
        );

        const exercise = result.rows[0];
        return exercise;
    }

    static async findByTargetMuscle(target: string) {}
}
