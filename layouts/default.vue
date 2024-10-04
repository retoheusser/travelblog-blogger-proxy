<script lang="ts" setup></script>

<template>
  <v-app>
    <v-app-bar
      :elevation="0"
      scroll-behavior="elevate"
      color="primary"
    >
      <template #title>
        <span>Wendy & Reto's <span class="font-weight-bold">travel blawg</span></span>
      </template>
    </v-app-bar>
    <v-main>
      <v-container class="px-0">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
