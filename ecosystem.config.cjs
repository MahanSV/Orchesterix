
module.exports = {
  apps: [
    {
      name: 'index',
      script: './index.ts',
      interpreter: 'node',
      node_args: '--import tsx',
      exec_mode: 'fork',
      instances: 1,
      watch: true,
      ignore_watch: ['node_modules', '.git'],
    },
  ],
};
