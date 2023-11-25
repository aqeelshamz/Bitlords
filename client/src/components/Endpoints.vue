<script setup>
import { ref } from "vue";

import { reactive } from "vue";

const endpoint = reactive({
	method: "",
	setMethd() {
		this.id;
	},
	endpointName: "",
	setEndpointName() {
		(e) => e.target.value;
	},
	remarks: "",
	setRemarks() {
		(e) => e.target.value;
	},
});
</script>

<template>
	<div class="text-black">
		<h3 class="text-xl font-bold m-10">Endpoints</h3>
		<!-- Your chat log content goes  here -->
		<div class="flex h-[600px] rounded-3xl">
			<button class="btn btn-wide btn-neutral ml-5 mt-5" onclick="my_modal_1.showModal()">New endpoint</button>
			<dialog id="my_modal_1" class="modal">
				<div class="modal-box">
					<h3 class="font-bold text-lg text-black">New endpoint</h3>
					<div class="flex flex-col mt-2">
						<input type="text" placeholder="About this API" @input="setRemarks($event)"
							class="input input-bordered w-full mt-3 text-black" />
						<select className="select select-bordered w-full mt-3">
							<option selected>Select Method</option>
							<option>GET</option>
							<option>POST</option>
						</select>
						<input type="text" placeholder="URL" @input="setEndpointName($event)"
							class="input input-bordered w-full mt-3 text-black" />
						<textarea className="textarea textarea-bordered mt-3" placeholder="Headers"></textarea>
						<textarea className="textarea textarea-bordered mt-3" placeholder="Body"></textarea>
					</div>

					<div class="modal-action">
						<form method="dialog">
							<!-- if there is a button in form, it will close the modal -->
							<button class="btn mr-2">Close</button>
							<button class="btn btn-primary px-10">Create Endpoint</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>

		<div class="overflow-x-auto">
			<table class="table table-zebra text-black">
				<!-- head -->
				<thead>
					<tr>
						<th></th>
						<th>Endpoint</th>
						<th>Method</th>
						<th>Remarks</th>
					</tr>
				</thead>
				<tbody>
					<!-- row 1 -->
					<tr>
						<th>1</th>
						<td>getAllAppointments</td>
						<td>GET</td>
						<td>To get all schedules</td>
					</tr>
					<!-- row 2 -->
					<tr>
						<th>2</th>
						<td>createAppointment</td>
						<td>POST</td>
						<td>To schedule a new appointment</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style>
/* Add custom styles for the ChatLog component */
</style>
