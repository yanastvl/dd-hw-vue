<template>
    <div :class="`dropdown__outer dropdown__toggle-${dropdownType}`" @click="toggle">
        <div>
            <div class="dropdown__label input__empty capet-down">
                <span class="dropdown__toggle-text ">{{ label }}</span>  
            </div>
            <ul class="dropdown__toggle-menu">
                <span v-if="optionsArray">
                    <li v-for="option in optionsArray" :key="option.name">
                        <Checkbox :name="option.name" :value="option.value" :label="option.label"></Checkbox>
                    </li>
                </span>
                <span v-else>
                    <li v-for="user in users" :key="user.id">
                        <Checkbox :value="user.id" :label="user.username" :isUser="true"></Checkbox>
                    </li>
                </span>
            </ul>
        </div>
    </div>
</template>

<script>
import Checkbox from "./Checkbox.vue";

export default {
    data() {
        return {
            currentPage: 1
        };
    },
    props: {
        "label": {
            type: String,
            required: true
        },
        "dropdownType": {
            type: String,
            required: true
        },
        "optionsArray": {
            type: Array
        },
        "users": {
            type: Array
        }
    },
    methods: {
        toggle: function (e) {
            const dropdowns = document.querySelectorAll(".dropdown__outer");
            const dropdown = e.currentTarget;
            window.onclick = function (e) {
                if (e.target != dropdown) {
                    dropdowns.forEach((dropdown) => {
                        dropdown.children[0].classList.remove("dropdown__toggle");
                        dropdown.children[0].children[0].classList.remove("input__default");
                        dropdown.children[0].children[0].classList.remove("capet-up");
                        dropdown.children[0].children[1].classList.remove("is-active");
                    });
                }
            };
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
