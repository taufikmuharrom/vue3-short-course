<script setup>
import { ref, computed } from "vue";

// state
const firstName = ref("Taufik");
const lastName = ref("Muharrom");

// METHOD → fungsi biasa, dipanggil ulang setiap kali template render
function getFullName() {
  console.log("Method dipanggil!");
  return firstName.value + " " + lastName.value;
}

// COMPUTED → hasilnya disimpan (cached) sampai ada dependency berubah
const fullName = computed(() => {
  console.log("Computed dipanggil!");
  return firstName.value + " " + lastName.value;
});
</script>

<template>
  <div>
    <h3>Method vs Computed</h3>

    <!-- Memanggil method berkali-kali -->
    <p>Method 1: {{ getFullName() }}</p>
    <p>Method 2: {{ getFullName() }}</p>
    <p>Method 3: {{ getFullName() }}</p>

    <hr />

    <!-- Computed hanya dihitung sekali, dipakai berulang -->
    <p>Computed 1: {{ fullName }}</p>
    <p>Computed 2: {{ fullName }}</p>
    <p>Computed 3: {{ fullName }}</p>

    <hr />

    <!-- Ubah state untuk melihat reactivity -->
    <input v-model="firstName" placeholder="First name" />
    <input v-model="lastName" placeholder="Last name" />
  </div>
</template>
