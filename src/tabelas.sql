CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    data_criacao TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sessoes (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL UNIQUE,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    data_criacao TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    short_url TEXT NOT NULL UNIQUE,
    contador INTEGER NOT NULL DEFAULT 0,
    user_id INTEGER NOT NULL REFERENCES usuarios(id),
    data_criacao TIMESTAMP NOT NULL DEFAULT NOW()
);