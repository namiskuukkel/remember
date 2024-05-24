<template>
    <v-card :title="event.countdown" :subtitle="event.name" :text="event.description" :color="event.color"></v-card>
</template>
<script setup lang="ts">
import { CalendarEvent } from '../pages/RememberView.vue';

const props = defineProps<{ event: CalendarEvent }>()
</script>