<template>
	<section class="main-wrapper">
		<CardHeader>
			<h3 class="header-caption">Задачи</h3>
			<div class="caption__button-inner">
				<router-link :to="taskAddOrEdit">
					<Button class="primary-button">Добавить задачу</Button>
				</router-link>
			</div>
		</CardHeader>
		    <section class="task__list">
            	<div class="task__list-inner">

            	<form @submit="handleSubmit">
                	<div class="search" id="search">
						<Dropdown label="Тип" dropdownType="type" :optionsArray="[
							{label: 'Задача', name: 'task'}, 
							{label: 'Ошибка', name: 'bug'}
						]">
						</Dropdown>
						<div class="dropdown__toggle-task input__empty">
							<Input type="text" placeholder="Название задачи" name="query"></Input>
						</div>
						<Dropdown label="Пользователь" dropdownType="user" :users="allUsers"></Dropdown>
						<Dropdown label="Статус" dropdownType="status" :optionsArray="[
							{label: 'Открыто', name: 'opened'}, 
							{label: 'В работе', name: 'inProgress'},
							{label: 'Тестируется', name: 'testing'},
							{label: 'Сделано', name: 'complete'}
						]">
						</Dropdown>
						<Dropdown label="Приоритет" dropdownType="priority" :optionsArray="[
							{label: 'Низкий', name: 'low'}, 
							{label: 'Средний', name: 'medium'},
							{label: 'Высокий', name: 'high'}
						]">
						</Dropdown>
						<button class="primary-button task-button" type="submit">Применить</button> 
					</div>
				</form>

				<div class="task__list-window">
					<TaskListItem v-for="task in tasks.data" :key="task.id" :task="task" :users="allUsers" :filter="filter" :hasDropdown="true"></TaskListItem>
				</div>
				<Paging :allObjectsNum="tasksTotal" @currentPage="currentPage"></Paging>
				</div>
			</section>
	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import { baseFilter } from '../api/service/events.service';

import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import ListView from "./ListView.vue";
import CardHeader from '../components/CardHeader.vue';
import Dropdown from '../components/Dropdown.vue';
import Paging from '../components/Paging.vue';
import TaskListItem from '../components/TaskListItem.vue';


export default {
    data() {
        return {
			taskAddOrEdit: {
				name: "TaskAddOrEditView"
			},
			filter: {
				"filter": {},
				"page": 0,
				"limit": 10
			},
		}
    },
	computed: {
		...mapGetters(['tasks', 'tasksTotal', 'users', 'allUsers', 'filters', 'activeTab']),
		getFilter: {
			get() {
				return this.filters[this.activeTab] || this.filter
			},
		}
	},
	mounted() {
		this.setActiveTab(this.$route.fullPath).then(() => {
			this.fetchAllUsers();

			this.filter = this.getFilter;
			this.setFilters(this.filter);
			this.fetchTasks(this.filter);
		});

	},
	methods: {
		...mapActions(['setLoading', 'fetchTasks', 'fetchUsers', 'fetchAllUsers', 'setFilters', 'setActiveTab']),
		currentPage(page) {
			this.filter.page = page - 1;
			this.fetchTasks(this.filter);
		},
		handleSubmit(e) {
			e.preventDefault();
			const target = e.target;
			const checkedUsers = document.querySelectorAll('input[class="checkbox-default user"]:checked');
        	const assignedUsers = Array.from(checkedUsers).map(user => user.value);

			this.filter.filter = {
				"query": target.query.value,
				"assignedUsers": assignedUsers,
				"type": [
					target.task.checked ? target.task.name : null,
					target.bug.checked ? target.bug.name : null,
				].filter(Boolean),
				"status": [
					target.opened.checked ? target.opened.name : null,
					target.inProgress.checked ? target.inProgress.name : null,
					target.testing.checked ? target.testing.name : null,
					target.complete.checked ? target.complete.name : null,
				].filter(Boolean),
				"rank": [
					target.low.checked ? target.low.name : null,
					target.medium.checked ? target.medium.name : null,
					target.high.checked ? target.high.name : null,
				].filter(Boolean),
			};

			this.fetchTasks(this.filter);
		}
	},
    components: { Button, Input, ListView, CardHeader, Dropdown, Paging, TaskListItem }
}
</script>

<style lang="scss" scoped>
  @import '../scss/vars.scss';
  @import '../scss/_mixins.scss';
  @import '../scss/components/buttons.scss';
  @import '../scss/components/task-list.scss';
</style>
