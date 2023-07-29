const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Increase payload size limit to 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Your API routes and other middleware can be defined here

// Example API route
app.post('/api/data', (req, res) => {
  const requestData = req.body;
  // Process the data received from the client

  res.json({ message: 'Data received successfully!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
