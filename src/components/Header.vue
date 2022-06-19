<template>
    <section class="header">
        <div class="header-wrap">
            <router-link :to="taskList" class="header-link">
                <img class="header-logo" :src="logo" alt=""/>
            </router-link>

            <div :class="`header-nav ${!user && 'hidden'}`">
                <router-link :to="taskList" active-class="nav__link-active" class="nav__link">Задачи</router-link>
                <router-link :to="userList" active-class="nav__link-active" class="nav__link">Пользователи</router-link>
            </div>

            <div :class="`user-profile ${!user && 'hidden'}`">
                <div class="user-name">
                    {{ user? user.data.username : '' }}
                </div>
                    <div class="user-photo">
                      <button class="dropdown__toggle-button">
                        <img class="user-avatar" alt="" :src="user? user.data.photoUrl: ''"/>
                            <ul class="dropdown__toggle-popup menu-avatar">
                                <li class="dropdown-input li-button">
                                  <router-link :to="{name: 'UserView', params: { id: user ? user.data.id : '111'} }" class="header-link">
                                      <a class="dropdown-link" >Посмотреть профиль</a>
                                  </router-link>
                                </li>

                                <li class="dropdown-input li-button">
                                    <a class="exit dropdown-link delete-task" @click="logout">Выйти из системы</a>
                                </li>
                            </ul>
                      </button>
                    </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            taskList: { name: "TaskListView" },
            userList: { name: "UserListView" },
            logo: require('../assets/images/Logo.svg'),
        }
    },
    created() {
      this.setCurrentUser(JSON.parse(localStorage.getItem('user')));
    },
    computed: {
      ...mapGetters(['user']),
    },
    methods: {
      ...mapActions(['setCurrentUser']),
      logout() {
        localStorage.removeItem('user');
        this.setCurrentUser();
        this.$router.push({name: "LoginView"});
      },
    },
    mounted() {
      // move to Dropdown ?
      const dropdownButtons = document.querySelectorAll('.dropdown__toggle-button');
      dropdownButtons.forEach((dropdown) => {
          document.addEventListener('click', (event) => {
              const withinBoundaries = event.composedPath().includes(dropdown);
              if (withinBoundaries) {
                  event.stopPropagation();
                  dropdown.classList.toggle('is-active');
              } else {
                  dropdown.classList.remove('is-active');
              }
          })
      })
    }
}
</script>

<style lang="scss" scoped>
  @import '../scss/vars.scss';
  @import '../scss/_mixins.scss';
  @import '../scss/components/header.scss';
  @import '../scss/components/task-list.scss';

  .hidden {
    display: none;
  }
</style>
