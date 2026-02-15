<template>
  <div v-if="result" class="result">
    <div :class="statusClass">
      Status: {{ result.status }} | Time: {{ result.time }} ms
    </div>

    <pre>{{ formattedBody }}</pre>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  result: Object
})

const formattedBody = computed(() =>
  JSON.stringify(props.result?.data, null, 2)
)

const statusClass = computed(() => {
  if (!props.result) return ''
  if (props.result.status >= 200 && props.result.status < 300)
    return 'status success'
  return 'status error'
})
</script>

<style scoped>
.status {
  font-weight: bold;
  margin-bottom: 10px;
}

.success {
  color: #22c55e;
}

.error {
  color: #ef4444;
}

pre {
  background: black;
  padding: 12px;
  border-radius: 6px;
  max-height: 200px;
  overflow: auto;
}
</style>
