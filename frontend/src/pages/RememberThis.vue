<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="600">
      <div class="text-center">
        <EventFilter :timeFrame="timeFrame" :onChangeTimeFrame="setTimeFrame"/>
        <CalendarView :events="events" :timeFrame="timeFrame"/>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs, { Dayjs} from 'dayjs'

import juhlapyhat from '../assets/calendars/juhlapyhat.json'
import lapsiperheenVuosi from '../assets/calendars/lapsiperheenVuosi.json'
import EventFilter from '../components/EventFilter.vue'
import CalendarView from '../components/CalendarView.vue'


const calendar1: CalendarEvent[][] = juhlapyhat.VCALENDAR.map((calendar) => calendar.VEVENT.map((event) => {
  return {
    name: event.SUMMARY,
    date: dayjs(event['DTSTART;VALUE=DATE'], 'YYYMMDD'),
    description: event.DESCRIPTION,
    color: 'red'
  }
}))


const calendar2: CalendarEvent[][] = lapsiperheenVuosi.VCALENDAR.map((calendar) => calendar.VEVENT.map((event) => {
  return {
    name: event.SUMMARY,
    date: dayjs(event['DTSTART;VALUE=DATE'], 'YYYMMDD'),
    description: event.DESCRIPTION,
    color: 'blue'
  }
}))

const events = ref([...calendar1[0], ...calendar2[0]])

const timeFrame = ref<TimeFrame>({unit: 'month', amount: 3})


const setTimeFrame = (newTimeFrame: TimeFrame) => {
  timeFrame.value = newTimeFrame
}

</script>
<script lang="ts">

type TimeFrame = {
  unit: string,
  amount: number
}

type CalendarEvent = {
  name: string,
  date: Dayjs,
  description: string,
  color: string
}

export { TimeFrame, CalendarEvent }
</script>
