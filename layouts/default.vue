<script lang="ts" setup></script>

<template>
  <v-app>
    <v-app-bar
      :elevation="0"
      scroll-behavior="elevate"
    >
      <div class="board-wrapper d-flex justify-center align-center bg-primary">
        <DepartureBoard />
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="px-0">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="css" scoped>
.board-wrapper {
  width: 100%;
  height: 100%;
}
</style>
