<template>
  <div class="container">
    <h2>Add Product</h2>

    <div class="form-group">
      <label>Title</label>
      <input v-model="title" type="text" placeholder="Product title" />
    </div>

    <div class="form-group">
      <label>Description</label>
      <textarea v-model="body" placeholder="Product description"></textarea>
    </div>

    <button @click="addProduct" :disabled="loading">
      <span v-if="loading">Saving...</span>
      <span v-else>Add Product</span>
    </button>

    <div v-if="response" class="response-box">
      <h3>Response:</h3>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const title = ref("");
const body = ref("");
const loading = ref(false);
const response = ref(null);

async function addProduct() {
  if (!title.value || !body.value) {
    alert("Please fill title and description");
    return;
  }

  loading.value = true;
  response.value = null;

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        body: body.value,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await res.json();
    response.value = data;

    // reset input
    title.value = "";
    body.value = "";
  } catch (error) {
    console.error("Error:", error);
    response.value = { error: "Failed to save" };
  } finally {
    loading.value = false;
  }
}
</script>

<style>
.container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 20px;
  font-size: 22px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #aaa;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

.response-box {
  margin-top: 20px;
  padding: 10px;
  background: #eafbe7;
  border: 1px solid #a6d5a1;
  border-radius: 4px;
  font-size: 14px;
}
</style>
