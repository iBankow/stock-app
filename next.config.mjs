/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = config.externals.concat([
      "mssql",
      "mysql2",
      "oracle",
      "oracledb",
      "postgres",
      "redshift",
      "sqlite3",
      "pg",
      "pg-query-stream",
      "tedious",
      "commonjs knex",
    ]);
    config.ignoreWarnings = [
      {
        module: /knex\/lib\/migrations/,
        message: /the request of a dependency is an expression/,
      },
    ];
    return config;
  },
};

export default nextConfig;
