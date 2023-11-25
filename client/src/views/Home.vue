<script setup lang="ts">
import { SignIn, SignedIn } from "vue-clerk";
import { useRouter } from "vue-router";

// Redirect to dashboard if user is logged in
if (SignedIn) {
  const router = useRouter();
  router.push("/dashboard");
}
</script>

<template>
  <div
    v-if="!SignedIn"
    class="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-sky-500"
  >
    <SignIn redirectUrl="/dashboard" />
  </div>
</template>
