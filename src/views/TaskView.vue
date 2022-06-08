<template>
    <span>
        <CardHeader>
            <div class="caption-title">
                <h3 class="header-caption">{{ task.title }}</h3>
                <div class="header__page-button">
                    <button :class="`header-button status-${task.status}`">{{ statusMap[task.status] }}</button>
                </div>
            </div>
            <div class="caption__button-inner">
                <button class="default-button" @click="updateTaskStatus(task.id, 'inProgress')">Взять в работу</button>
                <router-link :to="{name: 'TaskAddOrEditView', params: {id: task.id}}">
                    <button class="primary-button space">Редактировать</button>
                </router-link>
                <button class="error-button" @click="deleteTask(task.id)">Удалить</button>
            </div>
        </CardHeader>

        <section class="task__list">
            <div class="task__list-inner">
            <div class="task-window">
            <div class="user-col">

                <div class="task-inner"> 
                    <p class="task-label">Исполнитель</p>
                    <p class="task-text">{{ assignedUser.username }}</p>
                </div>

                <div class="task-inner"> 
                    <p class="task-label">Автор задачи</p>
                    <p class="task-text">{{ user.username }}</p>
                </div>

                <div class="task-inner"> 
                    <p class="task-label">Тип запроса</p>
                    <p class="task-text">{{ taskMap[task.type] }}</p>
                </div>

                <div class="task-inner"> 
                    <p class="task-label">Приоритет</p>
                    <p class="task-text">{{ rankMap[task.rank] }}</p>
                </div>


                <div class="task-inner"> 
                    <p class="task-label">Дата создания</p>
                    <p class="task-text">{{ createdAt }}</p>
                </div>

                <div class="task-inner"> 
                    <p class="task-label">Дата изменения</p>
                    <p class="task-text">{{ updatedAt }}</p>
                </div>

                <div v-if="timeSpent" class="task-inner time-form"> 
                    <p class="task-label">Затрачено времени</p>
                    <p class="task-text">{{ timeSpent }}</p>
                </div>

                <button @click="toggleModal" class="primary-button">Сделать запись о работе</button>

            </div>

            <div class="line"></div>

            <div class="text-col">
            <div class="task-inner"> 
            <p class="task-label">Описание</p>
            <p class="task-text">{{ task.description }}</p>
            </div>

            </div>
            <div class="line"></div>

            <div class="comment-col">
                <div class="task-inner"> 
                    <p class="task-label">Комментарии ({{ comments.length }})</p>
                        <form @submit="handleSubmit">
                            <textarea 
                                :class="`form__textarea  ${comment ? 'input__default' : 'input__empty'}`"
                                v-model="comment"
                                required
                            ></textarea>
                            <button class="success-button" type="submit">Добавить комментарий</button>
                        </form>
                </div>

                    <div v-for="comment in comments" :key="comment.id" class="task-inner"> 
                        <div class="task-delete"> 
                            <p class="task-label">{{ getUserName(comment.userId) }} ({{ createdCom(comment) }})</p>

                                <button v-if="isCurrentUser(comment.userId)" class="delete-comm" @click="deleteComment(comment.id)">Удалить</button>
                        </div>
                            <p class="task-text">{{ comment.text }}</p>
                    </div>
            </div>

            </div>
            </div>
        </section>

        <section id="modal" class="modal closed">
            <div class="modal-wrap overlay">
                <div class="modal-inner">
                <h2 class="modal-header">Запись о работе</h2>
                <form @submit="submitWorkTime">
                    <div class="modal-body">
                        <div class="authorization__input-inner">
                        <label htmlFor="name" class="authorization__input-text">Затраченное время</label>
                        <input 
                        type="number" 
                        min="0"
                        :class="`authorization__input-input ${time ? 'input__default' : 'input__empty'}`"
                        v-model="time"
                        required
                        />
                        </div>

                        <div class="authorization__input-inner">
                            <label htmlFor="name" class="authorization__input-text">Единица измерения</label>
                            <select class="task-select input__default capet-down"
                                v-model="timeFormat"
                                @blur="closeDropdown"
                                @click="toggleDropdown">
                                    <option value="day">День</option>
                                    <option value="hour">Час</option>
                                    <option value="minutes">Минута</option>
                            </select>
                        </div>

                        <div class="authorization__input-inner">
                            <div  class="authorization__input-form" >
                                <label htmlFor="textarea" class="authorization__input-text">Комментарий</label>
                                    <textarea 
                                    :class="`modal__textarea ${modalComment ? 'input__default' : 'input__empty'}`"
                                    v-model="modalComment"
                                    required
                                    ></textarea>
                            </div>
                        </div>
                            
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="primary-button space">Добавить</button>
                        <button class="default-button" @click="toggleModal">Отмена</button>
                    </div>
                </form>
            </div>
            </div>
        </section> 
    </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@/api';
import moment from 'moment';
import { RankMap, TaskMap, StatusMap } from '../utils/tasks-mapping';
import { closeDropdown, toggleDropdown } from '../utils/capet-actions.js';
import Button from "../components/Button.vue";
import CardHeader from "../components/CardHeader.vue";

export default {
    data() {
        return {
            currentUser: JSON.parse(localStorage.getItem('user')).data,
            user: {},
            assignedUser: {},
            task: {},
            statusMap: StatusMap,
            rankMap: RankMap,
            taskMap: TaskMap,
            comment: "",
            time: 0,
            timeFormat: "day",
            modalComment: "",
            timeMap: {
                "day": 1440,
                "hour": 60,
                "minutes": 1
            }
        }
    },
    props: {
        id: String,
    },
    computed: {
		...mapGetters(['allUsers', 'comments']),
        createdAt() {
            return moment(this.task.dateOfCreation).format('DD.MM.YY HH:mm');
        },
        updatedAt() {
            return moment(this.task.dateOfUpdate).format('DD.MM.YY HH:mm');
        },
        createdCom() { 
            return comment => moment(comment.dateOfCreation).format('DD.MM.YY HH:mm');
        },
        isCurrentUser() {
            return userId => userId === this.currentUser.id;
        },
        timeSpent() {
            const duration = moment.duration(this.task.timeInMinutes, 'minutes');
  
            function declension(forms, val) {
                const cases = [ 2, 0, 1, 1, 1, 2 ];
                return forms[(val % 100 > 4 && val % 100 < 20) ? 2 : cases[(val % 10 < 5) ? val % 10 : 5]];
            }

            const ref_days = declension([ 'день', 'дня', 'дней' ], duration.days());
            const ref_hours = declension([ 'час', 'часа', 'часов' ], duration.hours());
            const ref_minutes = declension([ 'минута', 'минуты', 'минут' ], duration.minutes());

            let time = '';
            duration.days() ? time += `${duration.days()} ${ref_days} ` : false
            duration.hours() ? time += `${duration.hours()} ${ref_hours} ` : false
            duration.minutes() ? time += `${duration.minutes()} ${ref_minutes}` : false
            return time
        }
    },
    mounted() {
        this.fetchComments(this.$props.id);
        this.fetchAllUsers();
        api.Tasks.getTask(this.$props.id).then(({data}) => {
            this.task = data;
            api.Users.getUser(data.userId).then((user) => {
                this.user = user.data;
            })
            api.Users.getUser(data.assignedId).then((user) => {
                this.assignedUser = user.data;
            })
        })
    },
    methods: {
        ...mapActions(['fetchAllUsers', 'fetchComments']),
        updateTaskStatus(taskId, status) {
            api.Tasks.patchTaskStatus(taskId, status).then(({data}) => {
                this.task = data;
            });
        },
        deleteTask(taskId) {
            api.Tasks.deleteTask(taskId).then(() => {
                this.$router.push({name: "TaskListView"});
            });
        },
        handleSubmit(e) {
            e.preventDefault();
            const data = {
                taskId: this.task.id,
                userId: this.currentUser.id,
                text: this.comment
            };
            this.comment = "";
            api.Comments.addComment(data).then(() => {
                this.fetchComments(this.task.id);
            });
        },
        submitWorkTime(e) {
            e.preventDefault();
            const time = this.time * this.timeMap[this.timeFormat];
            const data = {
                timeInMinutes: time,
                comment: this.modalComment,
                currentUser: this.currentUser.id,
            }
            api.Tasks.patchTaskWorktime(this.task.id, data).then(({data}) => {
                this.fetchComments(this.task.id);
                this.task = data.task;
                this.toggleModal(e);
                this.modalComment = "";
            });
        },
        deleteComment(commentId) {
            api.Comments.deleteComment(commentId).then(() => {
                this.fetchComments(this.task.id);
            });
        },
        getUserName(userId) {
            if (this.allUsers) {
                const user = this.allUsers.find(user => user.id === userId);
                if (user) {
                    return user.username;
                }
            }
        },
        toggleModal(e) {
            document.getElementById('modal').classList.toggle('closed');
            e.preventDefault();
        },
        closeDropdown(e) {
            closeDropdown(e)
        },
        toggleDropdown(e) {
            toggleDropdown(e)
        }
    },
    components: { Button, CardHeader }
}
</script>

<style lang="scss" scoped>
  @import '../scss/vars.scss';
  @import '../scss/_mixins.scss';
  @import '../scss/components/authorization.scss';
  @import '../scss/components/buttons.scss';
  @import '../scss/components/task.scss';
  @import '../scss/components/task-list.scss';
  @import '../scss/components/task-form.scss';
  @import '../scss/components/user-page.scss';
  @import '../scss/components/modal.scss';

</style>
