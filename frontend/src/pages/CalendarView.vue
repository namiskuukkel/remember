<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="600">
      <h1 class="text-h1">Tilatut kalenterit</h1>
      <div>
        <div>
          <v-btn @click="addCalendar()">Lisää kalenteri</v-btn>
          <v-text-field v-model="newCalendarUrl" label="Kalenterin URL"></v-text-field>
        </div>
        <h2 class="text-h2">Kalenterit</h2>
        <v-list lines="two">
          <v-list-item v-for="calendar in calendars" :key="calendar.url">
            <v-list-item-title>{{ calendar.name+ calendar.id}}</v-list-item-title>
            <v-list-item-action><v-btn @click="() => openDialog(calendar.id)">Muokkaa
                kalenteria</v-btn></v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
      <ColorPicker :open="dialog.open" :calendarId="dialog.calendarId"></ColorPicker>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import axios from 'axios';
import { BaseCalendar } from '../../../@types/remember/baseCalendar';
import ColorPicker from '../components/CalendarEdit.vue';

type BaseCalendarColor = BaseCalendar & { color: string }

const calendars = ref([] as BaseCalendarColor[])
const newCalendarUrl = ref('')
const dialog = ref({ open: false, calendarId: null as null | string })

axios.get(`${import.meta.env.VITE_API_URL}/getBaseCalendars`).then((response) => {
  const baseCalendars: BaseCalendarColor[] = response.data
  console.log(baseCalendars)
  calendars.value = baseCalendars
}).catch((error) => {
  console.error(error)
})

const addCalendar = () => {
  axios.post(`${import.meta.env.VITE_API_URL}/addCalendar`, { url: newCalendarUrl.value }).then((response) => {
    const newCalendar = response.data
    calendars.value = calendars.value.concat([{ id: newCalendar.id, name: newCalendar.name, url: newCalendarUrl.value, color: '#000000' }])
    newCalendarUrl.value = ''
  }).catch((error) => {
    console.error(error)
  })
}

const openDialog = (calendarId: string) => {
  console.log(calendarId)
  dialog.value = { open: true, calendarId: calendarId }
}

</script>