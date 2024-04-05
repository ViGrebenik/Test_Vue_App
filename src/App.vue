<template>
	<div class="app">
		<div :class="$style.container">
			<div :class="$style.blockTree">
				<TreeView :tree="tree" />
			</div>
			<div class="">
				<CreateItem @save="addItem" />
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import TreeView from './components/TreeView.vue'
import CreateItem from './components/createItem/CreateItem.vue'

export default {
	name: 'App',
	components: {
		TreeView,
		CreateItem,
	},
	setup() {
		const store = useStore()
		const tree = computed(() => store.state.tree)

		const addItem = (newItem, parentPath) => {
			if (!parentPath) {
				tree.value.push(newItem)
				return
			}

			const findParent = (items, path) => {
				const [current, ...rest] = path.split('/')
				const parent = items.find(item => item.name === current)
				if (rest.length === 0) {
					return parent
				}
				return findParent(parent.children, rest.join('/'))
			}

			const parent = findParent(tree.value, parentPath)
			if (parent) {
				if (!parent.children) {
					parent.children = []
				}
				parent.children.push(newItem)
			}
		}

		return {
			tree,
			addItem,
		}
	},
}
</script>

<style module lang="scss">
.container {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.blockTree {
	background-color: rgb(179 179 179 / 19%);
	backdrop-filter: blur(10px);
	border-radius: 5px;
	-webkit-backdrop-filter: blur(10px);
	padding: 10px;
	width: 500px;
}
</style>
