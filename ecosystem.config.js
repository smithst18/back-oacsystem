const apps = [
  {
    name: 'sgap',
    script: 'src/server.ts', // Si prefieres usar TypeScript, mantén el archivo .ts y asegúrate de que ts-node esté configurado
    interpreter: '/root/.nvm/versions/node/v16.17.0/bin/ts-node', // El intérprete ts-node para ejecutar TypeScript
    env: {
      PORT: "3002",
      DB_URI: "mongodb://172.17.89.9:27017/emsdm",
      PRIVATE_KEY: "SgH78/?+_01As",
      PUBLIC_URL: "172.17.89.9:3002/public"
    },
  },
];

module.exports = { apps };