<template>
    <v-alert v-model="props.alert.open" :text="props.alert.text" :title="props.alert.title" :type="props.alert.type" transition="slide-y-transition"></v-alert>
</template>
<script setup lang="ts">
import { VAlert } from 'vuetify/components';

const props = defineProps<{
    alert: AlertProps
}>()
</script>
<script lang="ts">
export type AlertProps = {
    open: boolean,
    text: string,
    title: string,
    type: 'success' | 'info' | 'warning' | 'error' | undefined
}
</script>