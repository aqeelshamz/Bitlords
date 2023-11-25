<template>
	<div class="flex">
		<ul className="menu h-screen bg-white w-80 rounded-box">
			<li className="menu-title text-xl">Dashboard</li>

			<li>
				<a @click="selectSection('chatLog')">Chat Log</a>
			</li>
			<li>
				<a @click="selectSection('customers')">Customers</a>
			</li>
			<li>
				<a @click="selectSection('endpoints')">Endpoints</a>
			</li>
			<li class="mb-5">
				<a @click="selectSection('endpoints')">Logout</a>
			</li>
		</ul>

		<!-- Main Content -->
		<div class="w-full p-5">
			<div v-if="selectedSection === 'endpoints'">
				<Endpoints />
			</div>
			<div v-if="selectedSection === 'chatLog'">
				<ChatLog />
			</div>
			<div v-else-if="selectedSection === 'customers'">
				<Customers />
			</div>
			<!-- Add more sections/components as needed -->
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import ChatLog from "../components/ChatLog.vue";
	import Customers from "../components/Customers.vue";
	import Endpoints from "../components/Endpoints.vue";

	const selectedSection = ref("chatLog");

	const selectSection = (section) => {
		selectedSection.value = section;
	};
</script>

<style>
	/* Add custom styles as needed */
</style>
