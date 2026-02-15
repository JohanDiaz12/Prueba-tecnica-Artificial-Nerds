<template>
  <div class="card">
    <h2>Webhook Tester</h2>

    <select v-model="scenario">
      <option value="">Normal</option>
      <option value="timeout">Timeout (3s delay)</option>
      <option value="invalid">Invalid (400)</option>
    </select>

    <textarea
      v-model="payload"
      placeholder='JSON Payload (ej: { "event": "payment" })'
    ></textarea>

    <button @click="execute">Send Webhook</button>

    <ResultPanel :result="result" />

    <div v-if="history.length" class="history">
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

const scenario = ref('')
const payload = ref('')
const result = ref(null)
const history = ref([])

const execute = async () => {
  let parsedPayload

  try {
    parsedPayload = JSON.parse(payload.value || '{}')
  } catch (err) {
    result.value = {
      status: 'Invalid JSON',
      data: { error: 'Payload is not valid JSON' },
      time: 0
    }
    return
  }

  const start = Date.now()

  try {
    const res = await axios.post(
      `${API}/webhook`,
      parsedPayload,
      {
        params: {
          scenario: scenario.value || undefined
        }
      }
    )

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

<style scoped>
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e2e8f0;
}

.history {
  margin-top: 15px;
}

.history ul {
  list-style: none;
  padding: 0;
  font-size: 13px;
}

.history li {
  margin-bottom: 5px;
}
</style>
