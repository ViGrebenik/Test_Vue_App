<template>
	<Teleport to="body">
		<div :class="$style.modalOverlay">
			<div :class="$style.modal">
				<input v-model="editedName" />
				<button @click="save">
					<img src="/public/svg/write.svg" alt="write" />
				</button>
				<span :class="$style.close" @click="close">✕</span>
			</div>
		</div>
	</Teleport>
</template>

<script>
export default {
	props: ['item'],
	data() {
		return {
			editedName: this.item.name
		}
	},
	methods: {
		save() {
			this.$emit('save', this.editedName)
			this.close()
		},
		close() {
			this.$emit('close')
		}
	}
}
</script>

<style module lang="scss">
.modalOverlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgb(43 43 43 / 40%);
	display: flex;
	justify-content: center;
	align-items: center;

	.modal {
		display: flex;
		align-items: center;
		background-color: rgb(48 48 48 / 52%);
		padding: 20px;
		border-radius: 5px;
		.close {
			position: relative;
			top: -21px;
			right: -14px;
			cursor: pointer;
		}
		img {
			margin-left: 10px;
			width: 25px;
			height: 25px;
		}
		span {
			color: #c0c0c0;
		}
		input {
			background: rgb(108 108 108 / 50%);
			border: none;
			border-radius: 5px;
			padding: 5px;
			color: #b7b7b7;
		}
	}
}
</style>
