<!-- components/App.vue -->
<template>
	<div id="app">
		<TreeView :tree="tree" />
	</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import TreeView from './components/TreeView.vue'

export default {
	name: 'App',
	components: {
		TreeView,
	},
	setup() {
		const store = useStore()
		const tree = computed(() => store.state.tree)

		return {
			tree,
		}
	},
}
</script>
