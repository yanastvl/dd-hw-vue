<template>
	<div class="dropdown-wrapper">
		<CardHeader>
			<h3 class="header-caption">Пользователи</h3>
		</CardHeader>

        <section class="user__list">
            <div class="user__list-inner">
                <div class="user__list-window">
                        <router-link v-for="user in users.data" :key="user.id" :to="{ name:'UserView', params: { id: user.id} }">
                            <div class="user__list-cards">
                                    <a class="user__list-card">{{ user.username }}</a>
                            </div>
                        </router-link>
                </div>
                <Paging :allObjectsNum="usersTotal" @setCurrentPage="setCurrentPage" :pageFromFilter="currentPage"/>
            </div>
        </section>

		<router-view></router-view>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Paging from '../components/Paging.vue';

export default {
    data() {
        return {
			filter: {
				"filter": {},
				"page": 0,
				"limit": 10
			},
		};
    },
	computed: {
		...mapGetters(['users', 'usersTotal']),
		currentPage: {
			get() {
				return this.filter.page + 1
			},
			set(page) {
				this.filter.page = page - 1
			}
		},
	},
	mounted() {
		this.filter.limit = 10;
        this.fetchUsers(this.filter);
    },
	methods: {
		...mapActions(['setLoading', 'fetchUsers']),
		setCurrentPage(page) {
			this.currentPage = page;
			this.fetchUsers(this.filter);
		}
	},
    components: { Paging }
}
</script>

<style lang="scss" scoped>
	@import '../scss/vars.scss';
	@import '../scss/_mixins.scss';
	@import '../scss/components/buttons.scss';
	@import '../scss/components/user-list.scss';
</style>
