<template>
  <v-app full-height>
    <v-app-bar :elevation="2">
  <template v-slot:prepend>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  </template>

    <v-app-bar-title>Muistathan, että...</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
      <v-list>
        <v-list-item>
          <RouterLink to="/">Etusivu</RouterLink>
        </v-list-item>
        <v-list-item>
          <RouterLink to="/calendars">Kalenterit</RouterLink>
        </v-list-item>
      </v-list>
      </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(false)
</script>