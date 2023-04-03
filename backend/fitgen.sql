\echo 'Delete and recreate fitgen db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE fitgen;
CREATE DATABASE fitgen;
\connect fitgen;

\i fitgen-schema.sql
\i fitgen-seed.sql

\echo 'Delete and recreate fitgen_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE fitgen_test;
CREATE DATABASE fitgen_test;
\connect fitgen_test

\i fitgen-schema.sql