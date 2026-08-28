import "dotenv/config";

const required = (name: string, fallback?: string) => {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

export const env = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: required("DATABASE_URL"),
  frontendUrl: required("FRONTEND_URL", "http://localhost:3000"),
};
