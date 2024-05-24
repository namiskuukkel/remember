<template>
    <v-color-picker @update:modelValue="colorChange" v-model="color"></v-color-picker>
    <EventCard :event="{}" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { BaseCalendar } from '../../../@types/remember/baseCalendar';

type BaseCalendarColor = BaseCalendar & { color: string }
const props = defineProps<{
    calendar: BaseCalendarColor
}>()

const color = ref(props.calendar.color)

const colorChange = (color: string) => {
    console.log(color)
}

</script>