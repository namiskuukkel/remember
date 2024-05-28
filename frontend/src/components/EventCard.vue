<template>
    <v-card :color="event.color" @click="toggleExpand" link height="100%">
        <v-card-title style="font-size: 1.5rem; font-weight: 400;">{{ event.name }} <span class="ml-4"
                style="font-size: 1.2rem;">{{ event.date }}</span></v-card-title>
        <v-card-text v-if="!expanded" style="font-size: 1.8rem; font-weight: 600;">{{ event.countdown }}</v-card-text>
        <v-card-text v-if="expanded">
            <v-expand-transition>
                <div>
                    <div class="pa-4">
                        <p style="font-size: 1.2rem; font-weight: 500;" v-html="description"></p>
                    </div>
                    <p style="font-size: 1.8rem; font-weight: 600;">{{ event.countdown }}</p>
                </div>
            </v-expand-transition>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { CalendarEvent } from '../pages/RememberView.vue';

const props = defineProps<{ event: CalendarEvent }>()

const description = computed(() => {
    return props.event.description.replace('\\n', '')
})

const expanded = ref(false)
const toggleExpand = () => {
    expanded.value = !expanded.value
};
</script>