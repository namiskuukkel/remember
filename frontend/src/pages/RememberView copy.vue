<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="600">
      <h1>Muistathan...</h1>
      <div class="text-center">
        <EventFilter :timeFrame="timeFrame" :onChangeTimeFrame="setTimeFrame" />
        <CalendarView :events="events" :timeFrame="timeFrame" />
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import axios from 'axios';

import EventFilter from '../components/EventFilter.vue'
import CalendarView from '../components/CalendarView.vue'

const events = ref([])
axios.get('http://localhost:5000/getCalendars').then((response) => {
  const eventCalendars = response.data
  events.value = eventCalendars.reduce((acc, calendar) => acc.concat(calendar.events), []).map((event) => ({ ...event, ...{ date: dayjs(event.date, 'dd.MM.YYYY') } }))
}).catch((error) => {
    console.error(error)
  })

const timeFrame = ref<TimeFrame>({ unit: 'month', amount: 3 })


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
