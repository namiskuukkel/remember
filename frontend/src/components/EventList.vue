<template>
    <v-container class="pa-0">
        <v-row v-if="shownEvents && shownEvents.length > 0" v-for="event in shownEvents" dense>
            <v-col cols="12">
                <EventCard :event="event" />
            </v-col>
        </v-row>
        <p v-else style="font-size: 2rem;" class="py-6">ei ole mitään muistettavaa</p>
    </v-container>
</template>
<script setup lang="ts">

import { computed } from 'vue'
import dayjs, { ManipulateType } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fi'

dayjs.locale('fi') // use locale globally
// Enable timeframe filtering by adding comparison
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
// Enable time to calculation
dayjs.extend(relativeTime)

import { TimeFrame, CalendarEvent } from '../pages/RememberView.vue';
import EventCard from './EventCard.vue'
const props = defineProps<{ events: CalendarEvent[], timeFrame: TimeFrame }>()

const shownEvents = computed(() => {
    const futureEvents = props.events.filter((event) => event.date.isSameOrAfter(dayjs()))
    const eventsInTimeframe = futureEvents.filter((event) => event.date.isSameOrBefore(dayjs().add(props.timeFrame.amount, props.timeFrame.unit as ManipulateType))).sort((eventA, eventB) => {
        //Order by date
        if (eventA.date < eventB.date) return -1;
        if (eventA.date > eventB.date) return 1;
        return 0;
    })
    return eventsInTimeframe.map((event) => ({ ...event, ...{ date: event.date.format('DD.MM.YYYY'), countdown: event.date.fromNow() } }))
})
</script>