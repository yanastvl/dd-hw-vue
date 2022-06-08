<template>
    <div class="user__list-pagination">
      <div class="pagination-inner">
          <button 
            @click="prevPage"
            :class="`pagination__back pagination__back--${currentPage === 1 ? 'disabled' : 'default'}`"
            :disabled="currentPage === 1"
            >Назад
         </button>
            <button 
                @click="setPage(page)"
                v-for="page in pagesArray" :key="page"
                :class="`pagination__number pagination__number--${currentPage === page ? 'stay' : 'default'}`"
                >{{ page }}
            </button>
          <button 
            @click="nextPage"
            :class="`pagination__forward pagination__forward--${pagesNum === currentPage ? 'disabled' : 'default'}`"
            :disabled="pagesNum === currentPage"
            >Вперед
         </button>
      </div>
      <div class="pagination-text">
          Показано {{ shown }} из {{ allObjectsNum }}
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1
        }
    },
    props: {
		'allObjectsNum': {
			type: Number,
			required: true
        }
	},
    computed: {
        pagesNum() {
            return Math.ceil(this.allObjectsNum / 10)
        },
        pagesArray() {
            return Array.from(Array(this.pagesNum)).map((_, i) => i+1);
        },
        shown() {
            return `${1+(10*(this.currentPage-1))} - ${this.pagesNum === this.currentPage ? this.allObjectsNum : 10+(10*(this.currentPage-1))}`
        }
    },
    methods: {
        setPage(page) {
            this.currentPage = page;
            this.$emit('currentPage', this.currentPage);
        },
        prevPage() {
            this.setPage(this.currentPage -= 1);
        },
        nextPage() {
            this.setPage(this.currentPage += 1);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/vars.scss';
    @import '../scss/_mixins.scss';
    @import '../scss/components/buttons.scss';
    @import '../scss/components/user-list.scss';

</style>
