<template>
    <v-main>
        <v-container>
            <v-row v-for="event in shownEvents" dense>
                <v-col cols="12">
                    <v-card :title="event.countdown" :subtitle="event.name" :text="event.description" :color="event.color">
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
<script setup lang="ts">

import { computed, ref } from 'vue'
import dayjs, { Dayjs, ManipulateType } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fi' // ES 2015 

dayjs.locale('fi') // use locale globally
// Enable timeframe filtering by adding comparison
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
// Enable time to calculation
dayjs.extend(relativeTime)

import { TimeFrame, CalendarEvent } from '../pages/RememberView.vue';
const props = defineProps<{ events: CalendarEvent[], timeFrame: TimeFrame }>()

const shownEvents = computed(() => {
    const futureEvents = props.events.filter((event) => event.date.isSameOrAfter(dayjs()))
    const eventsInTimeframe = futureEvents.filter((event) => event.date.isSameOrBefore(dayjs().add(props.timeFrame.amount, props.timeFrame.unit as ManipulateType)))
    return eventsInTimeframe.map((event) => ({ ...event, ...{ date: event.date.format('DD.MM.YYYY'), countdown: event.date.fromNow() } }))
})
</script>