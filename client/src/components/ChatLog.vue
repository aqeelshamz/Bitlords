<script setup>
import { ref } from "vue";

const customers = ref([
  {
    id: 1,
    name: "John Doe",
    messages: [
      {
        id: 1,
        sender: "AI",
        text: "How can I help you?",
      },
      {
        id: 2,
        sender: "Jane Doe",
        text: "I need help with my account.",
      },
      {
        id: 3,
        sender: "AI",
        text: "Sure, what can I help you with?",
      },
    ],
  },
  {
    id: 2,
    name: "Adam Smith",
    messages: [
      {
        id: 1,
        sender: "AI",
        text: "Hello, how can I help you?",
      },
      {
        id: 2,
        sender: "John Doe",
        text: "I need help with my account.",
      },
      {
        id: 3,
        sender: "AI",
        text: "Sure, what can I help you with?",
      },
    ],
  },
]);

const selectedCustomer = ref(null);

const selectCustomer = (customer) => {
  selectedCustomer.value = customer;
};
</script>

<template>
  <div class="text-black">
    <h3 class="text-xl font-bold mb-4">Chats Log Section</h3>
    <!-- Your chat log content goes  here -->
    <div class="flex bg-white h-[600px] rounded-3xl text-white">
      <!-- Customer Menu -->
      <div class="w-1/5 p-4 bg-slate-700 rounded-3xl">
        <h3 class="text-xl font-bold mb-4">Customers</h3>
        <ul class="space-y-2">
          <li
            v-for="customer in customers"
            :key="customer.id"
            @click="selectCustomer(customer)"
            class="cursor-pointer hover:text-sky-500"
          >
            {{ customer.name }}
          </li>
        </ul>
      </div>

      <!-- Chat Section -->
      <div class="flex-1 p-4 text-black">
        <div v-if="selectedCustomer">
          <h3 class="text-xl font-bold mb-4">
            {{ selectedCustomer.name }}'s Chat
          </h3>
          <div class="chat-container">
            <div
              v-for="message in selectedCustomer.messages"
              :key="message.id"
              :class="{
                'chat chat-end': message.sender === 'AI',
                'chat chat-start': message.sender !== 'AI',
              }"
            >
              <div
                class="chat-bubble"
                :class="{
                  'chat-bubble-success': message.sender === 'AI',
                  'chat-bubble-primary': message.sender !== 'AI',
                }"
              >
                {{ message.text }}
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Select a customer to view their chat.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Add custom styles for the ChatLog component */
</style>
