/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS role_code(
    code VARCHAR(4) PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(255)
);

INSERT INTO role_code(code, name, description)
VALUES
    ('USR', 'USER', 'A person that reads, downloads books on the platfom'),
    ('ORG', 'ORGANIZATION', 'A company that upload books for users to interact with'),
    ('ADM', 'ADMIN', 'A person that controls the affairs of the platform');

CREATE TABLE IF NOT EXISTS users(
    id VARCHAR PRIMARY KEY DEFAULT 'usr-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() As varchar(50))
            , '-','')
        ),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone_number VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(4) REFERENCES role_code(code) DEFAULT 'USR',
    is_confirmed BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS organizations(
    id VARCHAR PRIMARY KEY DEFAULT 'org-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() As varchar(50))
            , '-','')
        ),
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone_number VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(4) REFERENCES role_code(code) DEFAULT 'ORG',
    is_confirmed BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
