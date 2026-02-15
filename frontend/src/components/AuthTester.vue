<template>
  <div class="card">
    <h2>Auth Tester</h2>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="execute">Execute Login</button>

    <ResultPanel :result="result" />

    <div v-if="history.length">
      <h4>History</h4>
      <ul>
        <li v-for="(item, index) in history" :key="index">
          {{ item.status }} - {{ item.time }}ms
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ResultPanel from './ResultPanel.vue'

const API = 'http://localhost:3000'

const email = ref('')
const password = ref('')
const result = ref(null)
const history = ref([])

const execute = async () => {
  const start = Date.now()

  try {
    const res = await axios.post(`${API}/auth/login`, {
      email: email.value,
      password: password.value
    })

    const time = Date.now() - start

    result.value = {
      status: res.status,
      data: res.data,
      time
    }

    history.value.unshift(result.value)

  } catch (err) {
    const time = Date.now() - start

    result.value = {
      status: err.response?.status,
      data: err.response?.data,
      time
    }

    history.value.unshift(result.value)
  }
}
</script>
