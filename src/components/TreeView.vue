<!-- components/TreeView.vue -->
<template>
	<ul>
		<li v-for="(item, index) in tree" :key="index">
			<span @click="toggle(item)">
				{{ item.name }}
			</span>
			<button @click="editItem(item)">Edit</button>
			<button @click="deleteItem(item)">Delete</button>
			<TreeView v-if="item.children && item.expanded" :tree="item.children" />
		</li>
	</ul>
	<EditModal
		v-if="editedItem"
		:item="editedItem"
		@save="saveEditedItem"
		@close="closeEditModal"
	/>
</template>

<script>
import EditModal from './EditModal.vue'

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
	},
	components: {
		EditModal,
	},
}
</script>

<style scoped>
ul {
	list-style-type: none;
	padding-left: 1rem;
}

li {
	cursor: pointer;
}
</style>
