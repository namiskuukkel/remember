<template>
  <v-container style="height: 100vh;">
    <v-responsive class="align-centerfill-height mx-auto" max-width="600">
      <h1 class="text-h2">Tilatut kalenterit</h1>
      <v-container v-if="!loading">
        <v-container>
          <v-card text='Lisää uusi kalenteri antamalla kalenterin URL-osoite. Kalenterin URL päättyy ".ics".'
            class="mb-2"></v-card>
          <v-row>
            <v-col class="v-col-7"><v-text-field v-model="newCalendarUrl" label="Kalenterin URL"></v-text-field></v-col>
            <v-col class="v-col-auto">
              <v-btn @click="addCalendar()" size="large">Lisää kalenteri</v-btn></v-col>
          </v-row>
        </v-container>
        <v-container>
          <h3 class="text-h3">Kalenterit</h3>
          <v-container>
            <v-row v-for="calendar in calendars" :key="calendar.url">

              <v-col>{{ calendar.name }}</v-col>
              <v-col><v-btn @click="() => openDialog(calendar.id)">Muokkaa
                  kalenteria</v-btn></v-col>
              <v-divider></v-divider>
            </v-row>

          </v-container>
        </v-container>
      </v-container>
      <v-progress-circular v-else color="primary" indeterminate></v-progress-circular>
      <CalendarEdit :open="dialog.open" :calendarId="dialog.calendarId" :closeDialog="closeDialog"></CalendarEdit>
      <AlertPopup :alert="alert"></AlertPopup>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';
import { BaseCalendar } from '../../../@types/remember/baseCalendar';
import CalendarEdit from '../components/CalendarEdit.vue';
import AlertPopup, { AlertProps } from '../components/AlertPopup.vue';

type BaseCalendarColor = BaseCalendar & { color: string }

const calendars = ref([] as BaseCalendarColor[])
const newCalendarUrl = ref('')
const dialog = ref({ open: false, calendarId: null as null | string })
const nullAlert = { open: false, text: '', title: '', type: undefined } as AlertProps
const alert = ref(nullAlert)
const loading = ref(true)

axios.get(`${import.meta.env.VITE_API_URL}/getCalendars`).then((response) => {
  const eventCalendars: BaseCalendarColor[] = response.data
  calendars.value = eventCalendars
  loading.value = false
}).catch((error) => {
  loading.value = false
  alert.value = { open: true, text: 'Kalenterien lataus epäonnistui', title: 'Virhe', type: 'error' }
    hideAlert()
  // TODO: Handle error
  console.error(error)
})

const addCalendar = () => {
  axios.post(`${import.meta.env.VITE_API_URL}/addCalendar`, { url: newCalendarUrl.value }).then((response) => {
    const newCalendar = response.data
    calendars.value = calendars.value.concat([{ id: newCalendar.id, name: newCalendar.name, url: newCalendarUrl.value, color: '#000000' }])
    newCalendarUrl.value = ''
  }).catch((error) => {
    console.error(error)
    let errorMessage = 'Kalenterin lisääminen epäonnistui'
    switch (error.response.status) {
      case 400:
        errorMessage = 'Kalenterin lisääminen epäonnistui, tarkista kalenterin URL'
        break
      case 409:
        errorMessage = 'Kalenteri on jo lisätty'
        break
    }
    alert.value = { open: true, text: errorMessage, title: 'Virhe', type: 'error' }
    hideAlert()
    console.error(error)
  })
}

const openDialog = (calendarId: string) => {
  console.log(calendarId)
  dialog.value = { open: true, calendarId: calendarId }
}

const closeDialog = () => {
  dialog.value = { open: false, calendarId: null }
}

const hideAlert = () => {
  window.setInterval(() => {
    alert.value = nullAlert;
  }, 5000)
}
</script>