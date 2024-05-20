
import express, { Request, Response } from 'express';
import * as ical2json from 'ical2json'
import axios from 'axios'


const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
  });

app.get('/getCalendar/:id', async (req, res) => {
  const { id } = req.params
  const url = "https://calendar.google.com/calendar/ical/fi.finnish%23holiday%40group.v.calendar.google.com/public/basic.ics"
  axios.get(url).then((response) => {
    const icalCalendar = response.data
    const output = ical2json.convert(icalCalendar)
    return res.json(output)
  }).catch((error) => {
    console.log(error)
  })
})

app.get('/users', async (req, res) => {
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });