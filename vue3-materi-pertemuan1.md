# Vue 3 Setup - Pertemuan 1: Pengenalan Vue 3

## 📚 Materi Pembelajaran

### 1. Apa itu Vue.js & Ekosistemnya

Vue.js adalah progressive framework JavaScript untuk membangun user interface. Vue 3 memiliki beberapa keunggulan:

- **Performance**: Lebih cepat dengan Virtual DOM yang dioptimasi
- **Composition API**: Cara baru untuk menulis komponen yang lebih fleksibel
- **TypeScript Support**: Dukungan TypeScript yang lebih baik
- **Tree Shaking**: Bundle size yang lebih kecil

**Ekosistem Vue 3:**
- **Vite**: Build tool yang sangat cepat
- **Vue Router**: Routing untuk SPA
- **Pinia**: State management (pengganti Vuex)
- **Vue DevTools**: Debugging tools

### 2. Setup Project dengan Vite

#### Langkah-langkah Setup:

```bash
# 1. Buat project baru dengan Vite
npm create vue@latest my-vue-app

# 2. Pilih konfigurasi:
# ✅ Add TypeScript? → No
# ✅ Add JSX Support? → No  
# ✅ Add Vue Router? → No
# ✅ Add Pinia? → No
# ✅ Add Vitest? → No
# ✅ Add ESLint? → Yes
# ✅ Add Prettier? → Yes

# 3. Masuk ke folder project
cd my-vue-app

# 4. Install dependencies
npm install

# 5. Jalankan development server
npm run dev
```

### 3. Struktur Folder Vue

```
my-vue-app/
├── public/           # Static assets
├── src/
│   ├── components/   # Komponen Vue
│   ├── assets/       # Images, CSS, dll
│   ├── App.vue       # Root component
│   └── main.js       # Entry point
├── index.html        # HTML template
├── package.json      # Dependencies & scripts
└── vite.config.js    # Vite configuration
```

### 4. Template Syntax

#### A. Interpolasi (Text Interpolation)
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <p>{{ 2 + 3 }}</p>
    <p>{{ nama.toUpperCase() }}</p>
  </div>
</template>
```

#### B. Directives

##### v-bind (Attribute Binding)
```vue
<template>
  <div>
    <!-- Binding attribute -->
    <img v-bind:src="imageUrl" v-bind:alt="imageAlt">
    <!-- Shorthand -->
    <img :src="imageUrl" :alt="imageAlt">
    
    <!-- Class binding -->
    <div :class="{ active: isActive, error: hasError }"></div>
    
    <!-- Style binding -->
    <div :style="{ color: textColor, fontSize: fontSize + 'px' }"></div>
  </div>
</template>
```

##### v-if, v-else-if, v-else (Conditional Rendering)
```vue
<template>
  <div>
    <h1 v-if="score >= 90">Excellent!</h1>
    <h1 v-else-if="score >= 70">Good!</h1>
    <h1 v-else-if="score >= 50">Fair</h1>
    <h1 v-else>Need Improvement</h1>
    
    <!-- v-show vs v-if -->
    <p v-show="isVisible">Ini menggunakan v-show (display: none)</p>
    <p v-if="isVisible">Ini menggunakan v-if (DOM element)</p>
  </div>
</template>
```

##### v-for (List Rendering)
```vue
<template>
  <div>
    <!-- Array of strings -->
    <ul>
      <li v-for="hobby in hobbies" :key="hobby">
        {{ hobby }}
      </li>
    </ul>
    
    <!-- Array of objects -->
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
    
    <!-- With index -->
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ index }} - {{ item }}
      </li>
    </ul>
    
    <!-- Object properties -->
    <ul>
      <li v-for="(value, key) in object" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
  </div>
</template>
```

##### v-model (Two-way Binding)
```vue
<template>
  <div>
    <!-- Input text -->
    <input v-model="message" placeholder="Ketik sesuatu...">
    <p>Pesan: {{ message }}</p>
    
    <!-- Textarea -->
    <textarea v-model="description"></textarea>
    
    <!-- Checkbox -->
    <input type="checkbox" v-model="isChecked">
    <label>Setuju dengan syarat dan ketentuan</label>
    
    <!-- Radio buttons -->
    <input type="radio" value="A" v-model="selectedOption">
    <label>Option A</label>
    <input type="radio" value="B" v-model="selectedOption">
    <label>Option B</label>
    
    <!-- Select -->
    <select v-model="selectedCity">
      <option disabled value="">Pilih kota</option>
      <option value="jakarta">Jakarta</option>
      <option value="surabaya">Surabaya</option>
      <option value="bandung">Bandung</option>
    </select>
  </div>
</template>
```

### 5. Reactive Data dengan ref & reactive

#### A. ref() - Untuk primitive values
```vue
<script setup>
import { ref } from 'vue'

// Reactive primitive values
const count = ref(0)
const message = ref('Hello Vue!')
const isVisible = ref(true)

// Mengakses value dengan .value di script
console.log(count.value) // 0
count.value++ // increment

// Di template tidak perlu .value - otomatis unwrapped
</script>
```

#### B. reactive() - Untuk objects dan arrays
```vue
<script setup>
import { reactive } from 'vue'

// Reactive object
const user = reactive({
  name: 'John Doe',
  age: 25,
  email: 'john@example.com'
})

// Reactive array
const hobbies = reactive(['Reading', 'Swimming', 'Coding'])

// Nested reactive object
const state = reactive({
  user: {
    profile: {
      name: 'Jane',
      settings: {
        theme: 'dark'
      }
    }
  },
  items: [1, 2, 3]
})
</script>
```

#### C. Syntax `<script setup>` vs `setup()`

**Keuntungan `<script setup>`:**
- Lebih ringkas, tidak perlu return statement
- Auto-import components
- Better TypeScript inference
- Lebih mudah dibaca dan ditulis

**Perbandingan:**

**Traditional setup():**
```vue
<script>
import { ref } from 'vue'
import MyComponent from './MyComponent.vue'

export default {
  components: {
    MyComponent
  },
  setup() {
    const count = ref(0)
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      increment
    }
  }
}
</script>
```

**Script Setup (Recommended):**
```vue
<script setup>
import { ref } from 'vue'
import MyComponent from './MyComponent.vue'

// Langsung bisa digunakan - no return needed
const count = ref(0)

const increment = () => {
  count.value++
}
</script>
```

#### C. Kapan menggunakan ref vs reactive?

- **Gunakan ref()** untuk: primitive values (string, number, boolean), single values
- **Gunakan reactive()** untuk: objects, arrays, complex data structures

## 🛠️ Latihan Praktik

### Latihan 1: Setup Project Vue dengan Vite

**Tugas:**
1. Buat project Vue baru dengan nama `biodata-app`
2. Setup dengan konfigurasi minimal (tanpa TypeScript, Router, dll)
3. Jalankan development server
4. Buka di browser dan pastikan "Hello Vue!" muncul

**Langkah-langkah:**
```bash
npm create vue@latest biodata-app
cd biodata-app
npm install
npm run dev
```

### Latihan 2: Tampilkan Biodata Sederhana

**Tugas:** Buat komponen untuk menampilkan biodata dengan data binding

**File: `src/App.vue`**
```vue
<template>
  <div class="container">
    <h1>Biodata Saya</h1>
    
    <!-- Tampilkan biodata -->
    <div class="biodata">
      <h2>{{ nama }}</h2>
      <p><strong>Umur:</strong> {{ umur }} tahun</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Kota:</strong> {{ kota }}</p>
      
      <!-- Tampilkan daftar hobi -->
      <div class="hobi-section">
        <h3>Hobi Saya:</h3>
        <ul>
          <li v-for="hobby in hobi" :key="hobby">
            {{ hobby }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Menggunakan ref untuk primitive values
const nama = ref('John Doe')
const umur = ref(25)
const email = ref('john.doe@email.com')
const kota = ref('Jakarta')

// Menggunakan reactive untuk array
const hobi = reactive([
  'Membaca',
  'Berenang', 
  'Coding',
  'Gaming',
  'Traveling'
])
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.biodata {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.hobi-section {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  margin: 5px 0;
  border-radius: 4px;
  display: inline-block;
  margin-right: 10px;
}

h1 {
  color: #333;
  text-align: center;
}

h2 {
  color: #007bff;
  margin-bottom: 15px;
}
</style>
```

### Latihan 3: Implementasi Conditional Rendering dengan v-if

**Tugas:** Tambahkan kondisi untuk menampilkan status dewasa/remaja berdasarkan umur

**Update `src/App.vue`:**
```vue
<template>
  <div class="container">
    <h1>Biodata Saya</h1>
    
    <div class="biodata">
      <h2>{{ nama }}</h2>
      <p><strong>Umur:</strong> {{ umur }} tahun</p>
      
      <!-- Conditional rendering berdasarkan umur -->
      <div class="status">
        <p v-if="umur >= 18" class="dewasa">
          🎉 Status: <strong>Dewasa</strong>
        </p>
        <p v-else class="remaja">
          👶 Status: <strong>Remaja</strong>
        </p>
      </div>
      
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Kota:</strong> {{ kota }}</p>
      
      <!-- Kondisi untuk menampilkan hobi -->
      <div class="hobi-section">
        <h3>Hobi Saya:</h3>
        <div v-if="hobi.length > 0">
          <ul>
            <li v-for="hobby in hobi" :key="hobby">
              {{ hobby }}
            </li>
          </ul>
          <p class="total-hobi">
            <strong>Total Hobi: {{ hobi.length }}</strong>
          </p>
        </div>
        <p v-else class="no-hobi">
          Belum ada hobi yang terdaftar.
        </p>
      </div>
      
      <!-- Tombol untuk mengubah umur -->
      <div class="controls">
        <button @click="tambahUmur">Tambah Umur</button>
        <button @click="kurangiUmur">Kurangi Umur</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const nama = ref('John Doe')
const umur = ref(17) // Mulai dengan 17 untuk testing
const email = ref('john.doe@email.com')
const kota = ref('Jakarta')

const hobi = reactive([
  'Membaca',
  'Berenang', 
  'Coding',
  'Gaming',
  'Traveling'
])

// Methods untuk mengubah umur
const tambahUmur = () => {
  umur.value++
}

const kurangiUmur = () => {
  if (umur.value > 0) {
    umur.value--
  }
}
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.biodata {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.status {
  margin: 15px 0;
}

.dewasa {
  color: #28a745;
  font-weight: bold;
  background-color: #d4edda;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #c3e6cb;
}

.remaja {
  color: #ffc107;
  font-weight: bold;
  background-color: #fff3cd;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ffeaa7;
}

.hobi-section {
  margin-top: 20px;
}

.total-hobi {
  color: #6c757d;
  font-style: italic;
  margin-top: 10px;
}

.no-hobi {
  color: #dc3545;
  font-style: italic;
}

.controls {
  margin-top: 20px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  margin: 5px 0;
  border-radius: 4px;
  display: inline-block;
  margin-right: 10px;
}

h1 {
  color: #333;
  text-align: center;
}

h2 {
  color: #007bff;
  margin-bottom: 15px;
}
</style>
```

### Latihan 4: Challenge - Form Input Biodata

**Tugas:** Buat form untuk mengubah data biodata secara interaktif

**File: `src/components/BiodataForm.vue`**
```vue
<template>
  <div class="form-container">
    <h3>Edit Biodata</h3>
    <form @submit.prevent="updateBiodata">
      <div class="form-group">
        <label for="nama">Nama:</label>
        <input 
          type="text" 
          id="nama" 
          v-model="formData.nama"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="umur">Umur:</label>
        <input 
          type="number" 
          id="umur" 
          v-model.number="formData.umur"
          min="1"
          max="100"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.email"
          required
        >
      </div>
      
      <div class="form-group">
        <label for="kota">Kota:</label>
        <select v-model="formData.kota" required>
          <option value="">Pilih Kota</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Surabaya">Surabaya</option>
          <option value="Bandung">Bandung</option>
          <option value="Medan">Medan</option>
          <option value="Semarang">Semarang</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Hobi (centang yang sesuai):</label>
        <div class="checkbox-group">
          <label v-for="hobby in availableHobbies" :key="hobby">
            <input 
              type="checkbox" 
              :value="hobby"
              v-model="selectedHobbies"
            >
            {{ hobby }}
          </label>
        </div>
      </div>
      
      <button type="submit" class="submit-btn">
        Update Biodata
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Define emits
const emit = defineEmits(['update-biodata'])

const formData = reactive({
  nama: 'John Doe',
  umur: 25,
  email: 'john.doe@email.com',
  kota: 'Jakarta'
})

const availableHobbies = ref([
  'Membaca', 'Berenang', 'Coding', 'Gaming', 
  'Traveling', 'Fotografi', 'Memasak', 'Olahraga'
])

const selectedHobbies = ref([
  'Membaca', 'Berenang', 'Coding'
])

const updateBiodata = () => {
  const biodataUpdate = {
    ...formData,
    hobi: [...selectedHobbies.value]
  }
  
  emit('update-biodata', biodataUpdate)
  
  alert('Biodata berhasil diupdate!')
}
</script>

<style scoped>
.form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="number"],
input[type="email"],
select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  font-weight: normal;
  margin-bottom: 0;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
  margin-right: 5px;
}

.submit-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.submit-btn:hover {
  background-color: #218838;
}
</style>
```

**Update `src/App.vue` untuk menggunakan form:**
```vue
<template>
  <div class="container">
    <h1>Biodata Saya</h1>
    
    <!-- Tampilkan biodata -->
    <div class="biodata">
      <h2>{{ nama }}</h2>
      <p><strong>Umur:</strong> {{ umur }} tahun</p>
      
      <div class="status">
        <p v-if="umur >= 18" class="dewasa">
          🎉 Status: <strong>Dewasa</strong>
        </p>
        <p v-else class="remaja">
          👶 Status: <strong>Remaja</strong>
        </p>
      </div>
      
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Kota:</strong> {{ kota }}</p>
      
      <div class="hobi-section">
        <h3>Hobi Saya:</h3>
        <div v-if="hobi.length > 0">
          <ul>
            <li v-for="hobby in hobi" :key="hobby">
              {{ hobby }}
            </li>
          </ul>
          <p class="total-hobi">
            <strong>Total Hobi: {{ hobi.length }}</strong>
          </p>
        </div>
        <p v-else class="no-hobi">
          Belum ada hobi yang terdaftar.
        </p>
      </div>
    </div>
    
    <!-- Form untuk edit biodata -->
    <BiodataForm @update-biodata="handleUpdateBiodata" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BiodataForm from './components/BiodataForm.vue'

const nama = ref('John Doe')
const umur = ref(25)
const email = ref('john.doe@email.com')
const kota = ref('Jakarta')

const hobi = reactive([
  'Membaca',
  'Berenang', 
  'Coding'
])

const handleUpdateBiodata = (newData) => {
  nama.value = newData.nama
  umur.value = newData.umur
  email.value = newData.email
  kota.value = newData.kota
  
  // Update hobi array
  hobi.splice(0, hobi.length, ...newData.hobi)
}
</script>

<style>
/* Style yang sama seperti sebelumnya */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.biodata {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.status {
  margin: 15px 0;
}

.dewasa {
  color: #28a745;
  font-weight: bold;
  background-color: #d4edda;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #c3e6cb;
}

.remaja {
  color: #ffc107;
  font-weight: bold;
  background-color: #fff3cd;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ffeaa7;
}

.hobi-section {
  margin-top: 20px;
}

.total-hobi {
  color: #6c757d;
  font-style: italic;
  margin-top: 10px;
}

.no-hobi {
  color: #dc3545;
  font-style: italic;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  margin: 5px 0;
  border-radius: 4px;
  display: inline-block;
  margin-right: 10px;
}

h1 {
  color: #333;
  text-align: center;
}

h2 {
  color: #007bff;
  margin-bottom: 15px;
}
</style>
```

## 📝 Ringkasan Pertemuan 1

Pada pertemuan ini kita telah mempelajari:

1. **Setup Project**: Menggunakan Vite untuk membuat project Vue 3
2. **Template Syntax**: Interpolasi dan berbagai directive Vue
3. **Reactivity**: Perbedaan `ref()` dan `reactive()`
4. **Conditional Rendering**: Menggunakan `v-if`, `v-else-if`, `v-else`
5. **List Rendering**: Menggunakan `v-for` untuk menampilkan array
6. **Two-way Binding**: Menggunakan `v-model` untuk form input

## 🎯 Tugas Mandiri

1. Tambahkan validasi pada form (minimal 3 karakter untuk nama)
2. Buat fitur untuk menambah hobi custom (input text + tombol tambah)
3. Implementasikan fitur hapus hobi dengan tombol X di setiap item
4. Tambahkan animasi sederhana saat data berubah

**Tips:** Gunakan `computed properties` dan `watch` untuk validasi dan efek samping!