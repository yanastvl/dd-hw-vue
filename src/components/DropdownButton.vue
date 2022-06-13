<template>
		<button @click.prevent="toggleDropdown" class="dropdown__toggle-button user__list-more">
			<svg class="burger-button" width="20" height="20" viewBox="0 0 20 20" fill="" xmlns="http://www.w3.org/2000/svg">
				<path d="M5 5C5 4.44772 5.44772 4 6 4H14C14.5523 4 15 4.44772 15 5C15 5.55228 14.5523 6 14 6H6C5.44772 6 5 5.55228 5 5Z" fill=""/>
				<path d="M5 10C5 9.44772 5.44772 9 6 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10Z" fill=""/>
				<path d="M5 15C5 14.4477 5.44772 14 6 14H14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16H6C5.44772 16 5 15.5523 5 15Z" fill=""/>
            </svg>
			<slot></slot>
		</button>
</template>

<script>
export default {
	mounted() {
        document.addEventListener("click", this.close);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.close);
    },
	methods: {
		toggleDropdown(e) {
            e.currentTarget.classList.toggle("is-active");
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.$el.classList.remove("is-active");
            }
        },
	},
}
</script>

<style lang="scss" scoped>
  @import '../scss/vars.scss';
  @import '../scss/components/buttons.scss';
</style>
