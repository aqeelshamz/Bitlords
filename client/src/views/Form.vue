<!-- YourForm.vue -->
<template>
  <div class="max-w-md mx-auto mt-10">
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <input
          v-model="formData.name"
          type="text"
          id="name"
          name="name"
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label for="body" class="block text-sm font-medium text-gray-700"
          >body</label
        >
        <input
          v-model="formData.body"
          type="=text"
          id="body"
          name="body"
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label for="header" class="block text-sm font-medium text-gray-700"
          >header</label
        >
        <input
          v-model="formData.header"
          type="=text"
          id="header"
          name="header"
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div>
        <label for="method" class="block text-sm font-medium text-gray-700"
          >Method</label
        >
        <select
          v-model="formData.method"
          id="method"
          name="method"
          class="mt-1 p-2 w-full border rounded-md"
        >
          <option value="get">GET</option>
          <option value="post">POST</option>
        </select>
      </div>

      <div>
        <label for="apiUrl" class="block text-sm font-medium text-gray-700"
          >apiUrl</label
        >
        <textarea
          v-model="formData.apiUrl"
          id="apiUrl"
          name="apiUrl"
          rows="4"
          class="mt-1 p-2 w-full border rounded-md"
        ></textarea>
      </div>

      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-md">
        create end point
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        apiUrl: "",
        description: "",
      },
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      console.log("Form submitted:", this.formData);
    },
  },
};
</script>

<style scoped>
/* You can add custom styles here */
</style>
