import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.post('/api/contact', async (req, res) => {
    try {
        console.log({body: req.body})
        await fetch('https://bolthornmakersbackend.cyclic.app/contact', {
          method: 'POST',
          headers: {
              'accept-encoding': 'gzip, deflate, br',
              'accept': '*/*',
              'content-type': 'application/json'
          },
          mode: 'no-cors',
          body: JSON.stringify(req.body),
        });
        res.status(201).send('request sent correctly');
    } catch (error) {
        console.log({error})        
    }
});

app.listen(port, () => {
  console.log(`Proxy server working on port: ${port}`);
});