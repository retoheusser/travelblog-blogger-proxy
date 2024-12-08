<script lang="ts" setup>
const { y } = useWindowScroll()
</script>

<template>
  <v-app>
    <v-app-bar
      :elevation="0"
      scroll-behavior="elevate"
      :density="y > 0 ? undefined : 'prominent'"
      image="https://internationalliving.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2Fwv75stsetqy3%2FDaKdXY2tkQGWeVQiCbSx7%2Fac01166282697e4e0cafb99180d35cd1%2FThailand_Featured.jpg%3Fq%3D60%26fit%3Dfill%26fm%3Dwebp&w=1920&q=60"
    >
      <div class="board-wrapper d-flex justify-center align-center">
        <v-icon
          style="font-size: 64px;"
          color="white"
        >
          mdi-airplane-takeoff
        </v-icon>
        <DepartureBoard />
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="pa-0">
        <v-row class="d-flex justify-center">
          <v-col
            :cols="12"
            :sm="8"
            :lg="6"
            :xl="4"
          >
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="css" scoped>
.board-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(var(--v-theme-primary), 0.9)
}
</style>
