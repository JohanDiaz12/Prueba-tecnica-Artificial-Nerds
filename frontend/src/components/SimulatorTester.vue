<template>
  <div class="card">
    <h2>Simulator Tester</h2>

    <input v-model="status" placeholder="HTTP Status" />
    <input v-model="delay" placeholder="Delay (ms)" />

    <button @click="execute">Execute Simulation</button>

    <ResultPanel :result="result" />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ResultPanel from './ResultPanel.vue'

const API = 'http://localhost:3000'

const status = ref(200)
const delay = ref(0)
const result = ref(null)

const execute = async () => {
  const start = Date.now()

  try {
    const res = await axios.get(`${API}/simulator`, {
      params: {
        status: status.value,
        delay: delay.value
      }
    })

    const time = Date.now() - start

    result.value = {
      status: res.status,
      data: res.data,
      time
    }

  } catch (err) {
    const time = Date.now() - start

    result.value = {
      status: err.response?.status,
      data: err.response?.data,
      time
    }
  }
}
</script>
