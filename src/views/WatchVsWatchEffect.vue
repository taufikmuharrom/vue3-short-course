<script setup>
import { ref, watchEffect, watch } from "vue";

const a = ref(0);
const b = ref(0);

watch(a, (newValue, oldValue) => {
  console.log("watch => a:", newValue, oldValue);
});

watchEffect(() => {
  console.log("watchEffect => a:", a.value, "b:", b.value);
});
</script>

<template>
  <h1>Watch vs WatchEffect</h1>
  <div>
    <button @click="a++">Tambah A ({{ a }})</button>
    <button @click="b++">Tambah B ({{ b }})</button>
  </div>
</template>
