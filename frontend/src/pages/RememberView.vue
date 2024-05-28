<template>
  <div class="pa-8">
    <v-container class="fill-height">
      <v-responsive class="align-centerfill-height mx-auto" max-width="600">
        <h1 class="text-h2">Muistathan, että...</h1>
        <EventFilter :timeFrame="timeFrame" :onChangeTimeFrame="setTimeFrame" class="mt-4"/>
        <v-container v-if="!loading" class="px-0 mt-8">
          <h2 class="text-h4">{{ `Seuraavan ${timeFrame.amount > 1 ? timeFrame.amount : ''} ${timeFrame.unit === 'week'
            ?
            'viikon' : 'kuukauden'} aikana`}}</h2>
          <EventList :events="events" :timeFrame="timeFrame" />
        </v-container>
        <CircularLoader :loading="loading" class="mt-10"/>
      </v-responsive>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import axios from 'axios';

import EventFilter from '../components/EventFilter.vue'
import EventList from '../components/EventList.vue'
import CircularLoader from '../components/CircularLoader.vue';

const events = ref([])
const timeFrame = ref<TimeFrame>({ unit: 'month', amount: 3 })
const loading = ref(true)
axios.get(`${import.meta.env.VITE_API_URL}/getCalendars`).then((response) => {
  const eventCalendars = response.data
  const formattedCalendars = eventCalendars.map(calendar => calendar.events.map(event => ({ ...event, ...{ date: dayjs(event.date, 'dd.MM.YYYY'), color: calendar.color } })))
  events.value = [].concat(...formattedCalendars)
  loading.value = false
}).catch((error) => {
  loading.value = false
  console.error(error)
})

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
