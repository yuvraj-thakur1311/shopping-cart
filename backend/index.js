const app = require('./server');
const PORT = 5000;


app.listen(PORT, () => {
  console.log('\n=============================================');
  console.log('SERVER STARTED SUCCESSFULLY');
  console.log('=============================================');
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log('\nAvailable Endpoints:');
  console.log(`GET  http://localhost:${PORT}/api/products`);
  console.log(`POST http://localhost:${PORT}/api/orders`);
  console.log(`\nTry visiting: http://localhost:${PORT}`);
  console.log('=============================================\n');
});