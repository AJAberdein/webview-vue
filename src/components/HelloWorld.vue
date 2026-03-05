<script setup>
import { onMounted, ref } from "vue";
import { useMiniProgram } from "@/composables";
import { MESSAGE, GET_AUTH_CODE } from "@/constants";

const { postMessage, onMessage } = useMiniProgram();

const message = ref("");

onMounted(() => {
  onMessageHandler();
});

const onMessageHandler = () => {
  onMessage((data) => {
    message.value = `${JSON.stringify(data)}`;
  });
};

const sendMessage = () => {
  postMessage(MESSAGE, {
    message: "Hello from WEB",
    timestamp: Date.now(),
  });
};

const auth = () => {
  postMessage(GET_AUTH_CODE, {});
};

const addressBook = () => {
  postMessage(ADDRESS_BOOK, {});
};
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <button class="btn-primary" @click="sendMessage">MESSAGE</button>
    <button class="btn-primary" @click="auth">AUTH</button>
    <button class="btn-primary" @click="addressBook">ADDRESS BOOK</button>
    <h3>RESULT:</h3>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

button {
  padding: 0.75rem 1.25rem;
  border-radius: var(--color-border-radius);
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0.5rem 0.5rem 0.5rem 0;
  width: 100%;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-text-light);
}
</style>
