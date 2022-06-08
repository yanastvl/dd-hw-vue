
import VueRouter from 'vue-router'

import LoginView from '../views/LoginView'
import TaskListView from '../views/TaskListView'
import TaskView from '../views/TaskView'
import TaskAddOrEditView from '../views/TaskAddOrEditView'
import UserListView from '../views/UserListView'
import UserView from '../views/UserView'
import PageNotFound from '../views/PageNotFound'

Vue.use(VueRouter)

const router = () => {
	const r = 
	 new VueRouter({
		mode: 'hash',
		routes: [
			{
				path: '/login',
				name: 'LoginView',
				component: LoginView, 
				props: true
			},
			{
				path: '/task-list', 
				name: 'TaskListView',
				component: TaskListView, 
				props: true,
				meta: { 
					requiresAuth: true
				}
			},
			{
				path: '/task/:id', 
				name: 'TaskView',
				component: TaskView, 
				props: true,
				meta: { 
					requiresAuth: true
				}
			},
			{
				path: '/task-edit/:id?', 
				name: 'TaskAddOrEditView',
				component: TaskAddOrEditView, 
				props: true,
				meta: { 
					requiresAuth: true
				}
			},
			{
				path: '/user-list', 
				name: 'UserListView',
				component: UserListView, 
				props: true,
				meta: { 
					requiresAuth: true
				}
			},
			{
				path: '/user/:id', 
				name: 'UserView',
				component: UserView, 
				props: true,
				meta: { 
					requiresAuth: true
				}
			},
			{
				path: '/404', 
				name: 'PageNotFound',
				component: PageNotFound
			},

			{
				path: '/', redirect: { name: 'TaskListView' }
			},
			{
				path: '*', redirect: { name: 'PageNotFound' }
			}
		],
	});

	r.beforeEach((to, from, next) => {
		if (to.matched.some(record => record.meta.requiresAuth)) {
		  if (!localStorage.getItem('user')) {
				next({
				  path: '/login',
				  params: { nextUrl: to.fullPath }
				})
		  } else {
			next();
		  }
		} else if (localStorage.getItem('user')) {
			next({
				name: 'TaskListView'
			})
		} else {
			next()
		}
	  })

	return r
}

export default router