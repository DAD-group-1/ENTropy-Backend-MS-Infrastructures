import dataSource from './data-source';

async function seed() {
  await dataSource.initialize();
  console.log('Database connected');

  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
