<template>
    <div class="task__page">
        <div class="task__page-list">

            <div class="type__inner">
               <div :class="`task__page-type square square-${taskComp.type}`">
                   <div class="circle"></div>
                </div>
            </div>
            
            <div class="task__inner">
                <router-link :to="{name: 'TaskView', params: { id: taskComp.id }}">
                    <a>
                        <div class="task__page-text">
                            {{ taskComp.title }}
                        </div>
                    </a>
                </router-link>
            </div>
                                        
            <div class="caption__inner">
                <router-link :to="{name: 'TaskView', params: { id: taskComp.id }}">
                    <h3 class="task__list-card">
                        {{ getUserName(taskComp.assignedId) }}
                    </h3>
                </router-link>
            </div>
            
            <div class="status__inner">
                <button :class="`task__page-button status-${taskComp.status}`">
                    {{ statusMap[taskComp.status] }}
                </button>
            </div>
            
            <div class="rank__inner">
                <button :class="`task__page-rank button__rank-${taskComp.rank}`">
                    {{ rankMap[taskComp.rank] }}
                </button>
            </div>
            
            <DropdownButton v-if="hasDropdown">
                                    <ul class="dropdown__toggle-popup menu-button">
                                        <li class="dropdown-input li-button">
                                            <router-link :to="{name: 'TaskAddOrEditView', params: { id: taskComp.id }}">
                                                <a class="dropdown-link">Редактировать</a>
                                            </router-link>
                                        </li>
            
                                        <li class="dropdown-input li-button" @click="deleteTask(taskComp.id)">
                                            <a class="dropdown-link delete-task">Удалить</a>
                                        </li>

                                        <li v-if="taskComp.status === 'opened'" class="dropdown-input li-button" @click="updateTaskStatus(taskComp.id, 'inProgress')">
                                            <a class="dropdown-link">Взять в работу</a>
                                        </li>

                                        <li v-if="taskComp.status === 'inProgress'" class="dropdown-input li-button" @click="updateTaskStatus(taskComp.id, 'testing')">
                                            <a class="dropdown-link">На тестирование</a>
                                        </li>
            
                                        <li v-if="['inProgress', 'testing', 'complete'].includes(taskComp.status)" class="dropdown-input li-button" @click="updateTaskStatus(taskComp.id, 'opened')">
                                            <a class="dropdown-link">Переоткрыть</a>
                                        </li>

                                        <li v-if="['opened', 'testing', 'inProgress'].includes(taskComp.status)" class="dropdown-input li-button" @click="updateTaskStatus(taskComp.id, 'complete')">
                                            <a class="dropdown-link">Готово</a>
                                        </li>
                                    </ul>
            </DropdownButton>
        </div>
    </div>
</template>

<script>
import { StatusMap, RankMap } from '../utils/tasks-mapping';
import { mapGetters, mapActions } from 'vuex';
import DropdownButton from './DropdownButton.vue';

export default {
    data() {
        return {
            statusMap: StatusMap,
            rankMap: RankMap
        };
    },
    computed: {
        taskComp: {
            get() { return this.task; },
            set(val) { return val; }
        }
    },
    props: ["task", "users", "filter", "hasDropdown"],
    methods: {
        ...mapActions(["setLoading", "fetchTasks", "fetchUsers", "fetchAllUsers"]),
        getUserName(taskAssignedId) {
            if (this.users) {
                const user = this.users.find(user => user.id === taskAssignedId);
                if (user) {
                    return user.username;
                }
            }
        },
        deleteTask(taskId) {
            this.$api.Tasks.deleteTask(taskId).then(() => {
                this.fetchTasks(this.$props.filter);
            });
        },
        updateTaskStatus(taskId, status) {
            this.$api.Tasks.patchTaskStatus(taskId, status).then(({ data }) => {
                this.taskComp = data;
                this.fetchTasks(this.$props.filter);
            });
        }
    },
    components: { DropdownButton }
}
</script>


<style lang="scss" scoped>
  @import '../scss/vars.scss';
  @import '../scss/_mixins.scss';
  @import '../scss/components/buttons.scss';
  @import '../scss/components/task-list.scss';
  @import '../scss/components/user-page.scss';
  @import '../scss/components/user-list.scss';
</style>