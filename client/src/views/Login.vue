<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <div class="p-10 shadow-xl rounded-lg max-w-xs">
      <p class="font-semibold text-xl mb-6 text-center">Login</p>
      <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs mb-5"
        @input="event => setUsername(event.target.value)" />
      <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs mb-5"
        @input="event => setPassword(event.target.value)" />
      <button className="btn btn-primary w-full" @click="login()">Login</button>
      <button className="btn mt-2 w-full" @click="register()">Register</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const register = () => {
  router.push("/register");
};

const username = ref("");
const password = ref("");

const setUsername = (val) => {
  username.value = val;
};

const setPassword = (val) => {
  password.value = val;
};

const login = (section) => {
  const config = {
    method: "POST",
    url: `http://localhost:8080/users/login`,
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": `application/json`,
    },
    data: {
      "username": username.value,
      "password": password.value,
    }
  };

  axios(config)
    .then((response) => {
      console.log("Logged In!");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("businessName", response.data.user.businessName);
      localStorage.setItem("businessDescription", response.data.user.businessDescription);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("id", response.data.user.id);
      router.push("/dashboard");
    })
    .catch((error) => {
      console.log("Something went wrong!");
    });
};
</script>

<style>
/* Add custom styles as needed */
</style>
