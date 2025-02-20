const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

function getCredentialsFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('credentials.txt', 'utf8', (err, data) => {
      if (err) {
        reject('Dosya okunamadı: ' + err);
        return;
      }
      const lines = data.split('\n');
      const credentials = {};
      lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
          credentials[key.trim()] = value.trim();
        }
      });
      resolve(credentials);
    });
  });
}

app.get('/getCredentials', async (req, res) => {
    try {
      const credentials = await getCredentialsFromFile();
      res.status(200).json({
        statusCode: 200,
        status: 'success',
        data: credentials
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        status: 'error',
        message: error
      });
  }
}); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});