<template>
    <v-sheet :elevation="1" border rounded class="pa-2">
        <h2 class="text-h5 ml-4">Näytettävä ajanjakso</h2>
        <v-form @submit.prevent>
            <v-container class="px-0 pb-0 text-center">
                <v-row justify="center" no-gutters>
                    <v-col cols="3">
                        <v-btn @click="updateTimeFrame({ amount: 2, unit: 'week' })" color="#0e59e3">2 viikkoa</v-btn>
                    </v-col>
                    <v-col cols="3">
                        <v-btn @click="updateTimeFrame({ amount: 1, unit: 'month' })" color="#d10793">1 kuukausi</v-btn>
                    </v-col>
                    <v-col cols="3">
                        <v-btn @click="updateTimeFrame({ amount: 2, unit: 'month' })" color="#09890d">2
                            kuukautta</v-btn>
                    </v-col>
                </v-row>
                <v-row justify="center" no-gutters class="pt-4">
                    <v-col cols="2">
                    <v-text-field @change="updateAmount" v-model="timeFrame.amount" :rules="rules" variant="outlined" 
                        aria-label="Aikayksiköiden lukumäärä" type="number" min="1" max="12" step="1"></v-text-field></v-col>
                    <v-col cols="3" style="align-content: center;">
                        <v-radio-group @change="updateTimeUnit"v-model="timeFrame.unit" density="compact">
                        <v-radio label="viikkoa" value="week"></v-radio>
                        <v-radio label="kuukautta" value="month"></v-radio>
                    </v-radio-group>
                </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-sheet>
</template>
<script setup lang="ts">

import { TimeFrame } from '../pages/RememberView.vue';

const rules = [
    (value) => {
        if (!isNaN(value) && value >= 0) return true
        return 'Anna positiivinen luku'
    },
]
const props = defineProps<{ timeFrame: TimeFrame, onChangeTimeFrame: (timeFrame: TimeFrame) => void }>()
const updateAmount = (event: Event) => {
    props.onChangeTimeFrame({ ...props.timeFrame, ...{ amount: parseInt((event.target as HTMLInputElement).value) } })
}
const updateTimeUnit = (event: Event) => {
    props.onChangeTimeFrame({ ...props.timeFrame, ...{ unit: (event.target as HTMLInputElement).value } })
}

const updateTimeFrame = (newTimeFrame: TimeFrame) => {
    props.onChangeTimeFrame(newTimeFrame)
}

</script>