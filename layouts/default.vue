<template>
  <v-app>
    <v-app-bar
      title="Wendy & Reto's travel blawg"
      :elevation="0"
      scroll-behavior="elevate"
      color="primary"
    />
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
