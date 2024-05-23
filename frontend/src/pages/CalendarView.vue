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
        <v-expansion-panels>
          <v-expansion-panel v-for="calendar in calendars" :key="calendar.url">
            <v-expansion-panel-title v-slot="{ expanded }">
              <v-row no-gutters>
                <v-col class="d-flex justify-start" cols="4">
                  {{ calendar.name }}
                </v-col>
                <v-col class="text--secondary" cols="8">
                  <v-fade-transition leave-absolute>
                    <v-row v-if="expanded"><v-color-picker></v-color-picker></v-row>
                    <v-row v-else style="width: 100%" no-gutters>
                      pälli
                    </v-row>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row justify="space-around" no-gutters>
               
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import axios from 'axios';
import { BaseCalendar } from '../../../@types/remember/baseCalendar';

const calendars = ref([] as BaseCalendar[])
const newCalendarUrl = ref('')

axios.get(`${import.meta.env.VITE_API_URL}/getBaseCalendars`).then((response) => {
  const baseCalendars: BaseCalendar[] = response.data
  calendars.value = baseCalendars
}).catch((error) => {
  console.error(error)
})

const addCalendar = () => {
  axios.post(`${import.meta.env.VITE_API_URL}/addCalendar`, { url: newCalendarUrl.value }).then((response) => {
    const newCalendar = response.data
    calendars.value = calendars.value.concat([{ name: newCalendar.name, url: newCalendarUrl.value }])
    newCalendarUrl.value = ''
  }).catch((error) => {
    console.error(error)
  })
}

</script>