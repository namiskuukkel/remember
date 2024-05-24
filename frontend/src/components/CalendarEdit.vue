<template>
    <v-dialog v-model="props.open" width="auto">
        <v-card prepend-icon="mdi-edit" title="Muokkaa kalenteria">
            <v-card-text>
                <v-color-picker @update:modelValue="colorChange" v-model="color"></v-color-picker>
                <EventCard :event="{ name: 'Esimerkki', description: 'Esimerkkiteksti', color: color }"></EventCard>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

                <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { BaseCalendar } from '../../../@types/remember/baseCalendar';

type BaseCalendarColor = BaseCalendar & { color: string }
const props = defineProps<{
    open: boolean,
    calendarId: string | null
}>()

const color = ref('#FFFFFF')

const colorChange = (color: string) => {
    console.log(color)
}

</script>