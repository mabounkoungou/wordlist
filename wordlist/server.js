const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));




app.post('/api/data', (req, res) => {
  const requestData = req.body;
  

  res.json({ message: 'Data received successfully!' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});



// --take alot of payloads--