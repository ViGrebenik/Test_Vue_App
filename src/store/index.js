import { createStore } from 'vuex'

export default createStore({
	state: {
		tree: [
			{
				name: 'Dir 1',
				type: 'dir',
				children: [
					{
						name: 'Dir 1-1',
						type: 'dir',
						children: [
							{
								name: 'File 1-1-1',
								type: 'file',
							},
						],
					},
					{
						name: 'File 1-2',
						type: 'file',
					},
				],
			},
			{
				name: 'Dir 2',
				type: 'dir',
				children: [
					{
						name: 'Dir 2-1',
						type: 'dir',
					},
					{
						name: 'File 2-2',
						type: 'file',
					},
				],
			},
			{
				name: 'File 2',
				type: 'file',
			},
		],
	},
	mutations: {
		updateItemName(state, payload) {
			payload.item.name = payload.newName
		},
		deleteItem(state, itemToDelete) {
			const deleteRecursive = items => {
				for (let i = 0; i < items.length; i++) {
					const item = items[i]
					if (item === itemToDelete) {
						items.splice(i, 1)
						return true
					}
					if (
						item.children &&
						item.children.length > 0 &&
						deleteRecursive(item.children)
					) {
						return true
					}
				}
				return false
			}

			deleteRecursive(state.tree)
		},
	},
})
