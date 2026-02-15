<template>
  <div class="container">
    <h1 class="title">Artificial Nerds - SDET Dashboard</h1>

    <div class="grid">
      <AuthTester />
      <SimulatorTester />
      <WebhookTester />
    </div>
  </div>
</template>

<script setup>
import AuthTester from './components/AuthTester.vue'
import SimulatorTester from './components/SimulatorTester.vue'
import WebhookTester from './components/WebhookTester.vue'
</script>
