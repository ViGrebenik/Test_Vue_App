<style module lang="scss">
.container {
	position: relative;
}

.block {
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
}
.blockButton {
	display: flex;
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}
ul {
	list-style-type: none;
	padding: 10px 0px 0px 10px;
	margin: 0;
	position: relative;
}

li {
	border-left: 1px solid rgb(255 255 255 / 16%);
	margin-bottom: 10px;
	cursor: pointer;
	position: relative;
}
button {
	display: flex;
	align-items: center;
	background: none;
	border: none;
	cursor: pointer;
	img {
		width: 20px;
		height: 20px;
	}
}

.blockName {
	display: inline-flex;
	align-items: center;

	.folder {
		width: 15px;
		height: 15px;
	}
	.file {
		width: 20px;
		height: 20px;
	}
	.arrow {
		width: 20px;
		height: 20px;
		transition: transform 0.3s;
		&.rotateDown {
			transform: rotate(180deg);
		}
	}
	span {
		margin-left: 5px;
		color: rgb(184, 184, 184);
	}
}
</style>

<template>
	<div :class="$style.container">
		<ul>
			<li v-for="(item, index) in tree" :key="index">
				<div :class="$style.block">
					<div :class="$style.blockName" @click="toggle(item)">
						<img
							:class="[$style.arrow, { [$style.rotateDown]: item.expanded }]"
							v-if="item.type === 'dir'"
							src="/public/svg/arrow.svg"
							alt="arrow"
						/>
						<img
							:class="$style.folder"
							v-if="item.type === 'dir'"
							src="/public/svg/folder.svg"
							alt="arrow"
						/>
						<img
							:class="$style.file"
							v-else
							src="/public/svg/file.svg"
							alt=""
						/>
						<span>{{ item.name }}</span>
					</div>
					<div :class="$style.blockButton">
						<button @click="editItem(item)">
							<img src="/public/svg/write.svg" alt="write" />
						</button>
						<button @click="deleteItem(item)">
							<img src="/public/svg/delete.svg" alt="delete" />
						</button>
					</div>
				</div>
				<TreeView v-if="item.children && item.expanded" :tree="item.children" />
			</li>
		</ul>
		<EditModal
			v-if="editedItem"
			:item="editedItem"
			@save="saveEditedItem"
			@close="closeEditModal"
		/>
	</div>
</template>

<script>
import EditModal from './modal/EditModal.vue'

export default {
	name: 'TreeView',
	props: ['tree'],
	data() {
		return {
			editedItem: null,
		}
	},
	methods: {
		toggle(item) {
			if (item.children) {
				item.expanded = !item.expanded
			}
		},
		editItem(item) {
			this.editedItem = item
		},
		deleteItem(item) {
			this.$store.commit('deleteItem', item)
		},
		saveEditedItem(newName) {
			this.$store.commit('updateItemName', { item: this.editedItem, newName })
			this.closeEditModal()
		},
		closeEditModal() {
			this.editedItem = null
		},
		expandAll() {
			const expandRecursive = items => {
				items.forEach(item => {
					item.expanded = true
					if (item.children) {
						expandRecursive(item.children)
					}
				})
			}
			expandRecursive(this.tree)
		},
	},
	components: {
		EditModal,
	},
	mounted() {
		this.expandAll()
	},
}
</script>
