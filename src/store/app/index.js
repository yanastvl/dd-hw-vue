import api from '@/api'

export const mutation = {
	SET_LOADING: 'SET_LOADING',
	SET_TASKS: 'SET_TASKS',
	SET_TASK: 'SET_TASK',
	SET_USERS: 'SET_USERS',
	SET_ALL_USERS: 'SET_ALL_USERS',
	SET_COMMENTS: 'SET_COMMENTS',
	SET_FILTER: 'SET_FILTER',
	SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
}

export default {
	state: {
		loading: false,
		tasks: [],
		tasksTotal: 0,
		task: {},
		allUsers: [],
		users: [],
		usersTotal: 0,
		comments: [],
		filters: {},
		activeTab: ''
	},

	getters: {
		loading: state => state.loading,
		tasks: state => state.tasks,
		tasksTotal: state => state.tasksTotal,
		task: state => state.task,
		allUsers: state => state.allUsers,
		users: state => state.users,
		usersTotal: state => state.usersTotal,
		comments: state => state.comments,
		activeTab: state => state.activeTab,
		filters: state => state.filters,
		getCurrentFilter: (state, getters) => state.filters[getters.activeTab],
	},

	mutations: {
		[mutation.SET_LOADING]: (state, isLoading) => {
			state.loading = isLoading
		},
		[mutation.SET_TASKS]: (state, data) => {
			state.tasks = data || []
			state.tasksTotal = data.total
		},
		[mutation.SET_TASK]: (state, data) => {
			state.task = data || {}
		},
		[mutation.SET_ALL_USERS]: (state, data) => {
			state.allUsers = data || []
		},
		[mutation.SET_USERS]: (state, data) => {
			state.users = data || []
			state.usersTotal = data.total
		},
		[mutation.SET_COMMENTS]: (state, data) => {
			state.comments = data || []
		},
		[mutation.SET_FILTER]: (state, data) => {
			Vue.prototype.$set(state.filters, state.activeTab, data)
		},
		[mutation.SET_ACTIVE_TAB]: (state, data) => {
			state.activeTab = data
		},
	},

	actions: {
		setLoading: ({ dispatch, commit }, value) => {
			commit(mutation.SET_LOADING, value)
		},

		fetchTasks: ({ dispatch, commit, getters }, filter) => {
			dispatch('setLoading', true)
			api.Tasks.getTasks(filter)
			.then(({data}) => {
				dispatch('setLoading', false)
				commit(mutation.SET_TASKS, data)
			})
		},
		
		fetchTask: ({ dispatch, commit, getters }, id) => {
			api.Tasks.getTask(id)
			.then(({data}) => {
				commit(mutation.SET_TASK, data)
			})
		},

		fetchAllUsers: ({commit}) => {
			api.Users.getAllUsers()
			.then(({data}) => {
				commit(mutation.SET_ALL_USERS, data)
			})
		},

		fetchUsers: ({ dispatch, commit, getters }, filter) => {
			dispatch('setLoading', true)
			api.Users.getUsers(filter)
			.then(({data}) => {
				dispatch('setLoading', false)
				commit(mutation.SET_USERS, data)
			})
		},

		fetchComments: ({ dispatch, commit, getters }, taskId) => {
			api.Comments.getComments(taskId)
			.then(({data}) => {
				commit(mutation.SET_COMMENTS, data)
			})
		},

		setActiveTab: ({ dispatch, commit }, value) => {
			commit(mutation.SET_ACTIVE_TAB, value)
		},
		setFilters: ({ dispatch, commit }, value) => {
			commit(mutation.SET_FILTER, value)
		},
	}
}
