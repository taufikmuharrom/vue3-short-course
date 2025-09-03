<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

const count = ref(0);

// Hook sebelum komponen di-mount ke DOM
onBeforeMount(() => {
  console.log("➡️ onBeforeMount: Komponen akan di-mount");
});

// Hook setelah komponen muncul di DOM
onMounted(() => {
  console.log("✅ onMounted: Komponen sudah di-mount");
});

// Hook sebelum komponen update (ada perubahan data)
onBeforeUpdate(() => {
  console.log("🔄 onBeforeUpdate: Komponen akan update, count =", count.value);
});

// Hook setelah komponen selesai update
onUpdated(() => {
  console.log("🔁 onUpdated: Komponen sudah update, count =", count.value);
});

// Hook sebelum komponen dihapus
onBeforeUnmount(() => {
  console.log("⚠️ onBeforeUnmount: Komponen akan dihapus");
});

// Hook setelah komponen dihapus
onUnmounted(() => {
  console.log("❌ onUnmounted: Komponen sudah dihapus");
});
</script>

<template>
  <div>
    <h2>Lifecycle Demo</h2>
    <p>Counter: {{ count }}</p>
    <button @click="count++">Tambah</button>
  </div>
</template>
