<script lang="ts" setup>
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Map } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import type { BlogPostLocation } from '~/types/blogger.types'

const props = defineProps<{ coordinates: BlogPostLocation[] }>()
const coordinatesTuples = computed<[number, number][]>(() => props.coordinates.map(({ lat, lng }) => [lng, lat]))

const { public: { mapbox: { token } } } = useRuntimeConfig()
const mapElement = ref<HTMLElement | null>(null)

watch(coordinatesTuples, (coords) => {
  mapboxgl.accessToken = token
  const map = new mapboxgl.Map({
    container: mapElement.value!,
    style: 'mapbox://styles/mapbox/light-v11',
    center: props.coordinates.at(1),
    zoom: 8,
  })

  map.on('load', () => {
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coords,
        },
        properties: {},
      },
    })

    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#37503D',
        'line-width': 5,
      },
    })

    map.addSource('current-location', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coords[0],
        },
        properties: {},
      },
    })

    map.addLayer({
      id: 'start-point',
      type: 'circle',
      source: 'current-location',
      paint: {
        'circle-radius': 15,
        'circle-color': '#37503D',
        'circle-opacity': 0.8,
        'circle-blur': 0.8,
      },
    })

    map.flyTo({
      center: props.coordinates.at(0),
      essential: true,
      maxDuration: 8000,
    })
  })
})
</script>

<template>
  <v-sheet>
    <div
      id="mapbox"
      ref="mapElement"
    />
  </v-sheet>
</template>

<style lang="css" scoped>
#mapbox {
  height: 300px;
}
</style>
