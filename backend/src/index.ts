import express, { Request, Response } from "express";
import * as ical2json from "ical2json";
import axios from "axios";
import dayjs from "dayjs";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";
import crypto from "crypto";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import cors from 'cors'

dayjs.extend(isSameOrAfter)

const app = express();
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 5000;

const serviceAccount: string = require("../remember-423611-591aaeae1709.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.get("/getCalendars", async (req, res) => {
  const calendarEvents = await db.collection("calendar-events").get();
  return res.json(calendarEvents.docs.map((doc) => doc.data()));
})

app.get("/getBaseCalendars", async (req, res) => {
  const calendars = await db.collection("base-calendars").get();
  return res.json(calendars.docs.map((doc) => doc.data()));
})

app.post("/addCalendar", async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  axios
    .get(url)
    .then(async (response) => {
      const icalCalendarData = response.data;
      const output: ical2json.IcalObject = ical2json.convert(icalCalendarData);

      const calendarId = crypto.randomBytes(16).toString("hex");
      const baseCalendar_docRef = db.collection("base-calendars").doc(calendarId);

      const icalCalendar = output.VCALENDAR[0] as ical2json.IcalObject;

      const calendar = {
        id: calendarId,
        name: icalCalendar["X-WR-CALNAME"],
        url: url,
        lastChecked: Timestamp.now(),
        public: true,
        owner: "remember",
        ical: icalCalendar,
        locale: 'fi-FI'
      };
      await baseCalendar_docRef.set(calendar);

      const eventsId = crypto.randomBytes(16).toString("hex");
      const events_docRef = db.collection("calendar-events").doc(eventsId);
      
      const events = (icalCalendar["VEVENT"] as ical2json.IcalObject[]).map((event) => ({
        name: event.SUMMARY,
        date: event['DTSTART;VALUE=DATE'] as string,
        description: event.DESCRIPTION,
      })).sort((eventA, eventB) => {
        if(eventA.date < eventB.date) return -1
        if(eventA.date > eventB.date) return 1
        return 0
      }).filter((event) => dayjs(event.date , 'YYYYMMDD').isSameOrAfter(dayjs()))
      await events_docRef.set({id: eventsId, base_calendar_id: calendarId, events: events})

      return res.json({name: calendar.name});
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/users", async (req, res) => {});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//   id
// name
// url
// lastChecked
// public
// events
// owner

// uid
// startDate
// endDate
// name -> summary
// lastModified
// description
