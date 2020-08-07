/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE role_code(
    code VARCHAR(4) PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(255)
);

INSERT INTO role_code(code, name, description)
VALUES
    ('USR', 'USER', 'A person that reads, downloads books on the platfom'),
    ('ORG', 'ORGANIZATION', 'A company that upload books for users to interact with'),
    ('ADM', 'ADMIN', 'A person that controls the affairs of the platform');

CREATE TABLE users(
    id VARCHAR PRIMARY KEY DEFAULT 'user-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() As varchar(50))
            , '-','')
        ),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(150),
    phone_number VARCHAR(30),
    password TEXT,
    salt VARCHAR,
    role VARCHAR(4) REFERENCES role_code(code),
    is_confirmed BOOLEAN,
    is_active BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
