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
            
            <button v-if="hasDropdown" class="dropdown__toggle-button user__list-more" @click.prevent="toggleDropdown">
                <svg class="burger-button" width="20" height="20" viewBox="0 0 20 20" fill="" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 5C5 4.44772 5.44772 4 6 4H14C14.5523 4 15 4.44772 15 5C15 5.55228 14.5523 6 14 6H6C5.44772 6 5 5.55228 5 5Z" fill=""/>
                    <path d="M5 10C5 9.44772 5.44772 9 6 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10Z" fill=""/>
                    <path d="M5 15C5 14.4477 5.44772 14 6 14H14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16H6C5.44772 16 5 15.5523 5 15Z" fill=""/>
                </svg>
                        
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
                             
            </button>
        </div>
    </div>
</template>

<script>
import { StatusMap, RankMap } from '../utils/tasks-mapping';
import { mapGetters, mapActions } from 'vuex';
import api from '@/api';

export default {
    data() {
        return {
            statusMap: StatusMap,
            rankMap: RankMap,
            state: false
        };
    },
    computed: {
        taskComp: { 
            get() { return this.$props.task },
            set(val) { return val } 
        }
    },
    mounted() {
        document.addEventListener('click', this.close);
    },
    beforeDestroy () {
        document.removeEventListener('click', this.close)
    },
    props: ['task', 'users', 'filter', 'hasDropdown'],
    methods: {
        ...mapActions(['setLoading', 'fetchTasks', 'fetchUsers', 'fetchAllUsers']),
        toggleDropdown (e) {
            e.currentTarget.classList.toggle('is-active');
        },
        close (e) {
            if (!this.$el.contains(e.target) && this.$props.hasDropdown) {
                this.$el.getElementsByClassName('dropdown__toggle-button')[0].classList.remove('is-active');
            }
        },
        getUserName(taskAssignedId) {
            if (this.users) {
                const user = this.users.find(user => user.id === taskAssignedId);
                if (user) {
                    return user.username;
                }
            }
        },
        deleteTask(taskId) {
            api.Tasks.deleteTask(taskId).then(() => {
                this.fetchTasks(this.$props.filter);
            });
        },
        updateTaskStatus(taskId, status) {
            api.Tasks.patchTaskStatus(taskId, status).then(({data}) => {
                this.taskComp = data;
                this.fetchTasks(this.$props.filter);
            });
        }
    }
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