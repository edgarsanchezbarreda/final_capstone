import { db } from '../db';
import bcrypt from 'bcrypt';
import { sqlForPartialUpdate } from '../helpers/sql';
import {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} from '../errors/expressError';

import { BCRYPT_WORK_FACTOR } from '../config';

class User {
    static async authenticate(username: string, password: string) {
        const result = await db.query(
            `SELECT username, password, email
			FROM users
			WHERE username = $1
			`,
            [username]
        );

        const user = result.rows[0];

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError('Invalid username/password');
    }

    static async register({ username, email, password }) {
        const duplicateCheck = await db.query(
            `SELECT username
			FROM users
			WHERE username = $1`,
            [username]
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
			(username, email, password)
			VALUES ($1, $2, $3)
			RETURNING username, email, password`,
            [username, email, hashedPassword]
        );

        const user = result.rows[0];
        return user;
    }

    static async update(username: string, data) {
        if (data.password) {
            data.password = await bcrypt.hash(
                data.password,
                BCRYPT_WORK_FACTOR
            );
        }

        const { setCols, values } = sqlForPartialUpdate(data, {
            email: 'email',
            password: 'password',
            age: 'age',
            height: 'height',
            weight: 'weight',
            gender: 'gender',
            experience: 'experience',
        });

        const usernameVarIdx = '$' + (values.length + 1);

        const querySql = `
			UPDATE users
			SET ${setCols}
			WHERE username = ${usernameVarIdx}
			RETURNING username, email, password, age, height, weight, gender, experience
		`;

        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        delete user.password;
        return user;
    }

    static async remove(username: string) {
        let result = await db.query(
            `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
            [username]
        );
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);
    }
}
