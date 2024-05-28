<template>
    <v-container class="mx-auto" v-if="loading">
        <v-row style="height: 60px;">
            <v-col cols="12" class="text-center">
                <v-progress-circular color="primary" :size="48" :width="5" indeterminate>
                </v-progress-circular>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-center">
                Ladataan kalentereita
            </v-col>
          </v-row>
    </v-container>
</template>
<script setup lang="ts">

const props = defineProps<{
    loading: boolean
}>()
</script>
