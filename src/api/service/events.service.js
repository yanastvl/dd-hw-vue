
export default api => {
    api.Auth = {
        login(data) {
            return api.instance.request({
                method: 'post',
                url: 'users/login',
                data: {
                    "login": data.login,
                    "password": data.password
                }
            })
        }
    }
	api.Tasks = {
		getTasks(filter) {
            return api.instance.request({
                method: 'post',
                url: `tasks`,
                data: filter
            })
        },
        getTask(id) {
            return api.instance.request({
                method: 'get',
                url: `/tasks/${id}`
            })
        },
        createOrEditTask(data) {
            return api.instance.request({
                method: 'put',
                url: `/tasks/createOrEdit`,
                data: data
            })
        },
        patchTaskStatus(taskId, status) {
            return api.instance.request({
                method: 'patch',
                url: `/tasks/${taskId}/status/${status}`
            })
        },
        patchTaskWorktime(taskId, data) {
            return api.instance.request({
                method: 'patch',
                url: `/tasks/${taskId}/worktime`,
                data: data
            })
        },
        deleteTask(taskId) {
            return api.instance.request({
                method: 'delete',
                url: `/tasks/${taskId}`
            })
        },
	},
    api.Users = {
        getAllUsers() {
            return api.instance.request({
                method: 'get',
                url: `users/all`
            })
        },
        getUsers(filter) {
            return api.instance.request({
                method: 'post',
                url: `users`,
                data: filter || baseFilter
            })
        },
        getUser(id) {
            return api.instance.request({
                method: 'get',
                url: `/users/${id}`            
            })
        },
        editUser(data) {
            return api.instance.request({
                method: 'put',
                url: `/users/edit`,
                data: data
            })
        },
    },
    api.Comments = {
        getComments(taskId) {
            return api.instance.request({
                method: 'get',
                url: `/comments/${taskId}`
            })
        },
        addComment(data) {
            return api.instance.request({
                method: 'put',
                url: `/comments/createOrEdit`,
                data: data
            })
        },
        deleteComment(commentId) {
            return api.instance.request({
                method: 'delete',
                url: `/comments/${commentId}`
            })
        }
    }
}