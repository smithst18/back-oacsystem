const apps = [
  {
    name: 'sgap',
    script: 'src/server.ts', // Si prefieres usar TypeScript, mantén el archivo .ts y asegúrate de que ts-node esté configurado
    interpreter: '/root/.nvm/versions/node/v16.17.0/bin/ts-node', // El intérprete ts-node para ejecutar TypeScript
    env: {
      PORT: "3002",
      DB_URI: "mongodb://admin:0p3r4d0rm1np3sc4%2F%3F%2A@172.17.89.9:27017/emsdm?authSource=admin",
      PRIVATE_KEY: "SgH78/?+_01As",
      PUBLIC_URL: "172.17.89.9:3002/public"
    },
    watch: ["src"],          // Directorios a observar
    ignore_watch: [          // Directorios a ignorar
      "node_modules", 
      "logs",
      ".git"
    ],
    watch_delay: 3000,       // Retardo antes de reiniciar (3 segundos)
  },
];

module.exports = { apps };
