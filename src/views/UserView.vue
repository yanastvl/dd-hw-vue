<template>
    <span>
    <CardHeader>
        <h3 class="header-caption">{{ user.username }}</h3>
        <div class="caption__button-inner">
            <router-link :to="{ name: 'TaskAddOrEditView', query: { userId: user.id }}">
				<Button class="default-button space">Добавить задачу</Button>
			</router-link>
				<Button v-if="isCurrentUser" class="primary-button" @click="toggleModal">Редактировать</Button>
        </div>
    </CardHeader>

    <section class="user__page">
        <div class="user__page-inner">
            <div class="user__page-window">
                <div class="user-col">
                    <div class="user__page-photo">
                        <img class="user__page-avatar" :src="user.photoUrl"/>
                    </div>
                    <div class="user__page-info">
                        <p class="user__page-about">О себе</p>
                        <p class="user__page-content">{{ user.about }}</p>
                    </div>
                </div>
                <div class="line"></div>
                <div class="task-col">
                    <h4 class="task__page-subtitle">Задачи</h4>
                    <div class="task__page-inner">
                        <TaskListItem v-for="task in tasks.data" :key="task.id" :task="task"></TaskListItem>
                    </div>
                    <Paging :allObjectsNum="tasksTotal" @currentPage="currentPage"></Paging>
                </div>
            </div>
        </div>
    </section>

    <section id="modal" class="modal closed">
        <div class="modal-wrap overlay">
            <div class="modal-inner">
            <h2 class="modal-header">
                Редактирование пользователя
            </h2>
            <form @submit="handleSubmit">
                <div class="modal-body">
                    <div class="authorization__input-inner">
                    <label htmlFor="name" class="authorization__input-text">Имя пользователя</label>
                    <input 
                        type="text" 
                        :class="`authorization__input-input ${!username ? 'input__empty' : 'input__default'}`"
                        v-model="username"
                        placeholder="username"
                        required
                        />
                    </div>
                    <div class="authorization__input-inner">
                        <label htmlFor="url" class="authorization__input-text">URL фотографии</label>
                        <input 
                            type="text" 
                            :class="`authorization__input-input ${!photoUrl ? 'input__empty' : 'input__default'}`" 
                            v-model="photoUrl"
                            placeholder="Введите URL"
                            required
                            />
                        </div>
                        <div class="authorization__input-inner">
                            <label htmlFor="textarea" class="authorization__input-text">О себе</label>
                            <textarea 
                                :class="`modal__textarea ${!about ? 'input__empty' : 'input__default'}`"
                                v-model="about"
                                required
                                ></textarea>
                        </div>
                </div>

                <div class="modal-footer">
                    <Button type="submit" class="primary-button space">Сохранить</Button>
                    <Button class="default-button" @click="toggleModal">Отмена</Button>
                </div>
            </form>
        </div>
        </div>
    </section>

    </span>
</template>

<script>
import api from '@/api'
import CardHeader from '../components/CardHeader.vue';
import TaskListItem from '../components/TaskListItem.vue';
import { mapGetters, mapActions } from 'vuex';
// import { baseFilter } from '../api/service/events.service';
import Button from '../components/Button.vue';

export default {
    data () {
        return {
            currentUser: JSON.parse(localStorage.getItem('user')).data,
            user: {},
            filter: {
				"filter": {},
				"page": 0,
				"limit": 10
			},
            username: '',
            about: '',
            photoUrl: ''
        }
    },
    watch: {
        '$route': function(){
            this.getUser();
        }
    },
    props: ['id'],
    mounted() {
        this.setActiveTab(this.$route.fullPath).then(() => {
            this.getUser();
        });
    },
    computed: {
		...mapGetters(['tasks', 'tasksTotal', 'filters', 'activeTab']),
        isCurrentUser() {
            return this.user.id === this.currentUser.id;
        },
        getFilter: {
			get() {
				return this.filters[this.activeTab] || this.filter
			},
		}
	},
    methods: {
		...mapActions(['fetchTasks', 'setActiveTab', 'setFilters']),
        currentPage(page) {
            this.filter.page = page - 1;
            this.fetchTasks(this.filter);
        },
        getUser() {
            api.Users.getUser(this.$props.id).then(({data}) => {
                this.user = data;
                this.username = data.username;
                this.about = data.about;
                this.photoUrl = data.photoUrl;

                this.filter = this.getFilter;
                this.filter.filter["assignedUsers"] = [data.id];
                this.fetchTasks(this.filter);
                this.setFilters(this.filter);
            });
        },
        toggleModal(e) {
            document.getElementById('modal').classList.toggle('closed');
            e.preventDefault();
        },
        handleSubmit(e) {
            e.preventDefault();
            const data = {
                id: this.user.id,
                login: this.user.login,
                password: '',
                username: this.username,
                about: this.about,
                photoUrl: this.photoUrl
            };
            api.Users.editUser(data).then(({data}) => {
                this.user = data;
                this.toggleModal(e);
            });
        },
    },
    components: { CardHeader, TaskListItem, Button, Button }
}
</script>

<style lang="scss" scoped>
  @import '../scss/vars.scss';
  @import '../scss/_mixins.scss';
  @import '../scss/components/authorization.scss';
    @import '../scss/components/buttons.scss';

  @import '../scss/components/task-list.scss';
  @import '../scss/components/user-page.scss';
  @import '../scss/components/modal.scss';

</style>