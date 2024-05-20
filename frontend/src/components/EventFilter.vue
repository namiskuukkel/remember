<template>
    <v-form>
        <v-container>
            <v-row>
    <v-text-field @change="updateAmount" v-model="timeFrame.amount" label="Aikajakso" type="number" min="1" max="12" step="1"></v-text-field>
    <v-radio-group @change="updateTimeUnit" inline v-model="timeFrame.unit">
        <v-radio label="Viikko" value="week"></v-radio>
        <v-radio label="Kuukausi" value="month"></v-radio>
    </v-radio-group>
</v-row>
</v-container>
</v-form>
</template>
<script setup lang="ts">

import { TimeFrame } from '../pages/RememberThis.vue';
import { ManipulateType } from 'dayjs';
const props = defineProps<{ timeFrame: TimeFrame, onChangeTimeFrame: (timeFrame: TimeFrame) => void }>()
const updateAmount = (event: Event) => {
    props.onChangeTimeFrame({ ...props.timeFrame, ...{ amount: parseInt((event.target as HTMLInputElement).value) } })
}
const updateTimeUnit = (event: Event) => {
    const newValue = (event.target as HTMLInputElement).value
    props.onChangeTimeFrame({ ...props.timeFrame, ...{ unit: (event.target as HTMLInputElement).value} })
}
</script>