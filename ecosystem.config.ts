const apps: any[] = [
  {
    name: 'sgap',
    script: 'src/server.ts',
    interpreter: '/root/.nvm/versions/node/v16.17.0/bin/ts-node',
    env: {
      PORT: "3002",
      DB_URI: "mongodb://localhost:27017/emsdm",
      PRIVATE_KEY: "SgH78/?+_01As",
      PUBLIC_URL: "localhost:3002/public"
    },
  },
];

export default { apps };
