<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <div class="p-10 shadow-xl rounded-lg max-w-xs">
      <p class="font-semibold text-xl mb-6 text-center">Register</p>
      <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs mb-5"
        @input="event => setUsername(event.target.value)" />
      <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs mb-5"
        @input="event => setPassword(event.target.value)" />
      <input type="text" placeholder="Business Name" className="input input-bordered w-full max-w-xs mb-5"
        @input="event => setBusinessName(event.target.value)" />
      <textarea className="textarea textarea-bordered w-full mb-5" placeholder="Business Description"
        @input="event => setBusinessDescription(event.target.value)"></textarea>
      <button className="btn btn-primary w-full" @click="register()">Register</button>
      <button className="btn mt-2 w-full" @click="login()">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const login = () => {
  router.push("/login");
};

const username = ref("");
const password = ref("");
const businessName = ref("");
const businessDescription = ref("");

const setUsername = (val) => {
  username.value = val;
};

const setPassword = (val) => {
  password.value = val;
};

const setBusinessName = (val) => {
  businessName.value = val;
};

const setBusinessDescription = (val) => {
  businessDescription.value = val;
};

const register = (section) => {
  const config = {
    method: "POST",
    url: `http://localhost:8080/users/signup`,
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": `application/json`,
    },
    data: {
      "username": username.value,
      "password": password.value,
      "businessName": businessName.value,
      "businessDescription": businessDescription.value
    }
  };

  axios(config)
    .then((response) => {
      console.log("Signed Up!");
      router.push("/login");
    })
    .catch((error) => {
      console.log("Something went wrong!");
    });
};
</script>

<style>
/* Add custom styles as needed */
</style>
