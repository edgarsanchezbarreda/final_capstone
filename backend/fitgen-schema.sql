-- CREATE TABLE users (
-- 	id SERIAL PRIMARY KEY,
-- 	username VARCHAR(25) UNIQUE,
-- 	email TEXT NOT NULL UNIQUE
-- 		CHECK (position('@' IN email) > 1),
-- 	password VARCHAR(30) NOT NULL,
-- 	age INTEGER,
-- 	height INTEGER,
-- 	weight INTEGER,
-- 	gender TEXT,
-- 	calorie_maintenance INT,
-- 	experience TEXT NOT NULL
-- )

-- CREATE TABLE workout (
-- 	id SERIAL PRIMARY KEY,
-- 	nickname TEXT NOT NULL,
-- 	equipment TEXT NOT NULL,
-- 	split TEXT NOT NULL,
-- 	frequency INTEGER NOT NULL,
-- 	chest TEXT,
-- 	back TEXT,
-- 	shoulders TEXT,
-- 	biceps TEXT,
-- 	triceps TEXT,
-- 	quads TEXT,
-- 	hamstrings TEXT,
-- 	calves TEXT,
-- 	abs TEXT,
-- )

-- CREATE user_workout (
-- 	user_id INTEGER
-- 		REFERENCES users on DELETE CASCADE,
-- 	workout_id INTEGER
-- 		REFERENCES workout on DELETE CASCADE,
-- 		PRIMARY KEY (user_id, workout_id)
-- )

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(25) UNIQUE,
	email TEXT NOT NULL UNIQUE
		CHECK (position('@' IN email) > 1),
	password VARCHAR(30) NOT NULL,
	age INTEGER,
	height INTEGER,
	weight INTEGER,
	gender TEXT,
	calorie_maintenance INT,
	experience TEXT NOT NULL
)

CREATE TABLE workout (
	id SERIAL PRIMARY KEY,
	nickname TEXT NOT NULL,
	equipment TEXT NOT NULL,
	split TEXT NOT NULL,
	frequency INTEGER NOT NULL,
	chest INTEGER
		REFERENCES exercise on DELETE CASCADE,
	back INTEGER
		REFERENCES exercise on DELETE CASCADE,
	shoulders INTEGER
		REFERENCES exercise on DELETE CASCADE,
	biceps INTEGER
		REFERENCES exercise on DELETE CASCADE,
	triceps INTEGER
		REFERENCES exercise on DELETE CASCADE,
	quads INTEGER
		REFERENCES exercise on DELETE CASCADE,
	hamstrings INTEGER
		REFERENCES exercise on DELETE CASCADE,
	calves INTEGER
		REFERENCES exercise on DELETE CASCADE,
	abs INTEGER
		REFERENCES exercise on DELETE CASCADE,
		PRIMARY KEY(id, chest, back, shoulders, biceps, triceps, quads, hamstring, calves, abs)
)

CREATE TABLE exercise (
	exercise_id SERIAL PRIMARY KEY
	bodyPart TEXT NOT NULL,
	equipment TEXT NOT NULL,
	gifUrl TEXT NOT NULL,
	id TEXT NOT NULL,
	name TEXT NOT NULL,
	target TEXT NOT NULL,
)

CREATE user_workout (
	user_id INTEGER
		REFERENCES users on DELETE CASCADE,
	workout_id INTEGER
		REFERENCES workout on DELETE CASCADE,
		PRIMARY KEY (user_id, workout_id)
)