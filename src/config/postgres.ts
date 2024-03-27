import postgres from 'postgres'

// export const db = postgres(Bun.env.POSTGRES_CONNECTION_STRING!);
export const db = postgres('postgresql://docker:docker@localhost:5433/short_links');