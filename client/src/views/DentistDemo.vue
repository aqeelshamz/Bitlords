<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { FiSend } from "react-icons/fi";

const messagess = ref(
  [
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
);

const router = useRouter();

const messages = ref([]);

const setMessages = (val) => {
  messages.value = val;
};

const message = ref("");

const setMessage = (val) => {
  message.value = val;
}

const sendMessage = (section) => {
  const config = {
    method: "POST",
    url: `http://localhost:8080/chat/send-message`,
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": `application/json`,
    },
    data: {
      "businessId": "8055f513-0d0b-43eb-bcd0-b854eb35136d",
      "messages": message.value === "" ? messages.value : [...messages.value, { role: "user", content: message.value }],
    }
  };

  axios(config)
    .then((response) => {
      setMessages(response.data)
      if (response.data[response.data.length - 1].content.includes("[REQUEST]") || response.data[response.data.length - 1].content.includes("api_request")) {
        sendMessage();
      }

      if (!response.data[response.data.length - 1].content.includes("[REQUEST]") && !response.data[response.data.length - 1].content.includes("api_request")) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = response.data[response.data.length - 1].content;
        window.speechSynthesis.speak(msg);
      }
    })
    .catch((error) => {
      console.log("Something went wrong!");
    });

  console.log(message.value)
  console.log(message.value === "")
  setMessages(message.value === "" ? messages.value : [...messages.value, { role: "user", content: message.value }]);
  setMessage("");
};

onMounted(() => {
  sendMessage();
});
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-[30vw] h-[100vh] flex flex-col items-center justify-center">
      <div class="chat-container w-[30vw] h-[90vh] overflow-auto">
        <div v-for="message in messages" :key="message.id" :class="{
          'chat chat-end': message.role !== 'assistant',
          'chat chat-start': message.role === 'assistant',
        }">
          <div v-if="message.role !== 'system' && !message.content.toString().includes('api_request')" class="chat-bubble"
            :class="{
              'chat-bubble-success': message.role !== 'assistant',
              'chat-bubble-primary': message.role === 'assistant',
            }">
            {{ message.role === "system" ? "" : message.content.toString().replaceAll("[REQUEST]", "") }}
          </div>
        </div>
      </div>
      <div class="flex items-center mt-5 w-full">
        <input type="text" placeholder="Type your message..." className="input input-bordered w-full mr-2"
          @input="event => setMessage(event.target.value)" v-model="message" />
        <button class="btn btn-primary btn-square px-10" @click="sendMessage()">
          <FiSend />Send
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* Add custom styles as needed */
</style>
