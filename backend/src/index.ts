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
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import cors from "cors";

dayjs.extend(isSameOrAfter);

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const serviceAccount: string = require("../remember-423611-591aaeae1709.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.get("/getCalendars", async (req, res) => {
  // TODO: Get only public or permitted
  const eventCalendars = await db.collection("eventCalendars").get();
  return res.json(eventCalendars.docs.map((doc) => doc.data()));
});

app.get("/getBaseCalendars", async (req, res) => {
  // TODO: Get only public or permitted
  const calendars = await db.collection("baseCalendars").get();
  return res.json(calendars.docs.map((doc) => doc.data()));
});

// TODO: auth
app.post("/addCalendar", async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send("url is required");
  }

  // TODO: Input sanitation
  const baseCalendarRef = db.collection("baseCalendars");
  const baseCalendar = await baseCalendarRef
    .where("url", "==", url)
    .where("public", "==", true)
    .get();
  if (!baseCalendar.empty) {
    return res.status(409).send("Calendar with this url is already added");
  }

  axios
    .get(url)
    .then(async (response) => {
      const icalCalendarData = response.data;
      const output: ical2json.IcalObject = ical2json.convert(icalCalendarData);

      const calendarId = crypto.randomBytes(16).toString("hex");
      const baseCalendar_docRef = baseCalendarRef.doc(calendarId);

      const icalCalendar = output.VCALENDAR[0] as ical2json.IcalObject;

      const calendar = {
        id: calendarId,
        name: icalCalendar["X-WR-CALNAME"],
        url: url,
        lastChecked: Timestamp.now(),
        public: true,
        owner: "remember",
        ical: icalCalendar,
        locale: "fi-FI",
      };
      await baseCalendar_docRef.set(calendar);

      const eventsId = crypto.randomBytes(16).toString("hex");
      const events_docRef = db.collection("eventCalendars").doc(eventsId);

      const events = (icalCalendar["VEVENT"] as ical2json.IcalObject[])
        .map((event) => ({
          name: event.SUMMARY,
          date: event["DTSTART;VALUE=DATE"] as string,
          description: event.DESCRIPTION,
          repeat: event.RRULE || null,
        })).filter((event) =>
          dayjs(event.date, "YYYYMMDD").isSameOrAfter(dayjs())
        ) //Remove past events
        .sort((eventA, eventB) => {
          //Order by date
          if (eventA.date < eventB.date) return -1;
          if (eventA.date > eventB.date) return 1;
          return 0;
        })
      // TODO: Filtering when past event is recurring?

      await events_docRef.set({
        id: eventsId,
        name: calendar.name,
        baseCalendarId: calendarId,
        events: events,
        color: "#FFFFFF",
      });

      return res.json({ name: calendar.name, id: eventsId, color: "#FFFFFF" });
    })
    .catch((error) => {
      console.log(error);
    });
});

// TODO: auth
app.put("/updateCalendar", async (req, res) => {
  const calendarId = req.body.calendarId;
  if (!calendarId) {
    return res.status(400).json({ error: "calendarId is required" });
  }
  
  // TODO: Input sanitation
  const color = req.body.color;

  // TODO: Permission to edit
  const eventCalendarRef = db.collection("eventCalendars").doc(calendarId);

  // Set the new color
  const updateRes = await eventCalendarRef.update({ color: color });

  console.log(updateRes);
  return res.status(200).send();
});

app.listen(port, () => {
  //TODO: env
  console.log(`Server running at http://localhost:${port}`);
});
