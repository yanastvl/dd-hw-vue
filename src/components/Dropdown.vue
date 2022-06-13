<template>
    <div :class="`dropdown__outer dropdown__toggle-${dropdownType}`" @click="toggle">
        <div>
            <div class="dropdown__label input__empty capet-down">
                <span class="dropdown__toggle-text ">{{ label }}</span>  
            </div>
            <ul class="dropdown__toggle-menu">
                <li v-for="option in optionsArray" :key="option.name">
                    <Checkbox :name="option.name" :value="option.value" :label="option.label" @checked="checked"></Checkbox>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Checkbox from "./Checkbox.vue";

export default {
    data() {
        return {
            checkedValues: []
        };
    },
    props: ['label', 'dropdownType', 'optionsArray'],
    methods: {
        checked(checkedValue) {
            this.checkedValues.push(checkedValue);
            this.$emit("checkedValues", this.checkedValues);
		},
        toggle: function (e) {
            const dropdowns = document.querySelectorAll(".dropdown__outer");
            const dropdown = e.currentTarget;

            const dropdownListener = (e) => {
                if (e.target != dropdown) {
                    dropdowns.forEach((dropdown) => {
                        dropdown.children[0].classList.remove("dropdown__toggle");
                        dropdown.children[0].children[0].classList.remove("input__default");
                        dropdown.children[0].children[0].classList.remove("capet-up");
                        dropdown.children[0].children[1].classList.remove("is-active");
                    });
                }
                window.removeEventListener('click', dropdownListener);
            }
            window.addEventListener('click', dropdownListener);

            const withinBoundaries = e.composedPath().includes(dropdown);
            if (withinBoundaries) {
                e.stopPropagation();
                dropdown.children[0].classList.toggle("dropdown__toggle");
                dropdown.children[0].children[0].classList.toggle("input__default");
                dropdown.children[0].children[0].classList.toggle("capet-up");
                dropdown.children[0].children[1].classList.toggle("is-active");
            }
        }
    },
    components: { Checkbox }
}
</script>

<style lang="scss" scoped>
    @import '../scss/vars.scss';
    @import '../scss/_mixins.scss';
    @import '../scss/components/buttons.scss';
    @import '../scss/components/task-list.scss';

</style>
