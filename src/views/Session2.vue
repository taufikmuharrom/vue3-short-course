<script setup>
import { watch, ref, watchEffect } from "vue";

const a = ref(2);
const b = ref(3);

const nilaiSiswa = ref(0);
const predikat = ref("");

watch(nilaiSiswa, (nilaiBaru) => {
  console.log("WATCH: " + nilaiBaru);
  if (nilaiBaru >= 75) {
    predikat.value = "A";
  } else if (nilaiBaru >= 60) {
    predikat.value = "B";
  } else if (nilaiBaru >= 45) {
    predikat.value = "C";
  } else {
    predikat.value = "D";
  }
});

watchEffect(() => {
  console.log("WATCH EFFECT");
  console.log(`WATCH EFFECT: ${a.value}`);
});
</script>

<template>
  <p>PREDIKAT: {{ predikat }}</p>
  <p>INPUT NILAI: {{ nilaiSiswa }}</p>
  <input type="number" v-model="nilaiSiswa" />

  <p>A: {{ a }}</p>
  <input type="number" v-model="a" />
</template>
