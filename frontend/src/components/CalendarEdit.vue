<template>
    <v-dialog v-model="open" width="auto">
        <v-card prepend-icon="mdi-pencil" title="Muokkaa kalenteria">
            <v-card-text>
                <v-color-picker v-model="color"></v-color-picker>
                <EventCard :event="{ name: 'Esimerkki', date: dayjs().add(1, 'day').format('DD.MM.YYYY'), countdown: '1 päivän päästä', description: 'Esimerkkiteksti', color: color }"></EventCard>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Peruuta" variant="plain" @click="props.closeDialog"></v-btn>
                <v-btn color="primary" text="Tallenna" variant="tonal" @click="saveChange"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { BaseCalendar } from '../../../@types/remember/baseCalendar';
import axios from 'axios';
import dayjs from 'dayjs';

type BaseCalendarColor = BaseCalendar & { color: string }
const props = defineProps<{
    open: boolean,
    calendarId: string | null,
    closeDialog: () => void
}>()

const open = computed(() => props.open)

const color = ref('#FFFFFF')

const saveChange = () => {
    axios.put(`${import.meta.env.VITE_API_URL}/updateCalendar`, { calendarId: props.calendarId, color: color.value }).then(() => {
    props.closeDialog()
  }).catch((error) => {
    console.error(error)
  })
}

</script>