<!-- components/EditModal.vue -->
<template>
	<div class="modal-overlay">
		<div class="modal">
			<input v-model="editedName" />
			<button @click="save">Save</button>
			<span class="close" @click="close">✕</span>
		</div>
	</div>
</template>

<script>
export default {
	props: ['item'],
	data() {
		return {
			editedName: this.item.name,
		}
	},
	methods: {
		save() {
			this.$emit('save', this.editedName)
			this.close()
		},
		close() {
			this.$emit('close')
		},
	},
}
</script>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}
spam {
	color: black;
}

.modal {
	background-color: white;
	padding: 20px;
	border-radius: 5px;
}

input {
	margin-bottom: 10px;
}

.close {
	position: absolute;
	top: 5px;
	right: 10px;
	cursor: pointer;
}
</style>
