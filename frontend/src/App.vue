<template>
  <v-app>
    <v-app-bar :elevation="2">
      <RouterLink to="/">Muistathan, että...</RouterLink>
      <RouterLink to="/calendars">Calendars</RouterLink>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
</script>