<template>
	<div :class="$style.container">
		<input v-model="itemName" placeholder="Enter name" />
		<div :class="$style.blockSetting">
			<select v-model="parentPath">
				<option value="">Root</option>
				<option v-for="path in parentPaths" :key="path" :value="path">
					{{ path }}
				</option>
			</select>
			<select v-model="itemType">
				<option value="dir">Folder</option>
				<option value="file">File</option>
			</select>
			<button @click="saveItem">
				<img src="/public/svg/writeSetting.svg" alt="write" />
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			itemName: '',
			parentPath: '',
			itemType: 'dir',
		}
	},
	methods: {
		saveItem() {
			if (!this.itemName) {
				alert('Please enter a file or folder name')
				return
			}
			const newItem = {
				name: this.itemName,
				type: this.itemType,
			}
			this.$emit('save', newItem, this.parentPath)
			this.itemName = ''
			this.parentPath = ''
			this.itemType = 'dir'
		},
	},
	computed: {
		tree() {
			return this.$store.state.tree
		},
		parentPaths() {
			const paths = []

			const buildPaths = (items, path = '') => {
				items.forEach(item => {
					if (item.type === 'dir') {
						const newPath = path ? `${path}/${item.name}` : item.name
						paths.push(newPath)
						if (item.children) {
							buildPaths(item.children, newPath)
						}
					}
				})
			}
			buildPaths(this.tree)
			return paths
		},
	},
}
</script>

<style module lang="scss">
.container {
	background-color: rgb(179 179 179 / 39%);
	backdrop-filter: blur(10px);
	border-radius: 5px;
	-webkit-backdrop-filter: blur(10px);
	padding: 10px;
	display: flex;
	width: 500px;
	gap: 10px;
	.blockSetting {
		display: flex;
		gap: 10px;
		img {
			width: 30px;
			height: 30px;
		}
	}

	input,
	select {
		border: none;
		border-radius: 5px;
		color: #fbfbfbb4;
		padding: 5px;
		background: rgb(192 192 192 / 21%);
		&::placeholder {
			color: #fbfbfbb4;
		}
	}
	input {
		width: 100%;
	}
}
</style>
