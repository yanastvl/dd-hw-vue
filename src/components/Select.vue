<template>
    <div class="task-inner"> 
        <p class="task-label">{{ label }}</p>
            <select class="task-select input__default capet-down" 
                :value="value"
                @input="$emit('input', $event.target.value)"
                @blur="closeDropdown"
                @click="toggleDropdown"
                required>
                    <option v-for="option in optionsArray" :key="option.value" :value="option.value">
                        {{ option.text }}
                    </option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.username }}
                    </option>
            </select>
    </div>
</template>

<script>
import { closeDropdown, toggleDropdown } from '../utils/capet-actions.js';

export default {
    props: ['label', 'value', 'optionsArray', 'users'],
    methods: {
        closeDropdown(e) {
            closeDropdown(e)
        },
        toggleDropdown(e) {
            toggleDropdown(e)
        },
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/vars.scss';
    @import '../scss/_mixins.scss';

    .task {
        &-header {
            display: flex;
        }

        &-window {
            min-height: 602px;

            width: 100%;
            position: relative;
            display: flex;
            flex-direction: row;

            background: $white;
        }

        &-inner {
            padding-bottom: 20px;
        }

        &-label {
            @include text;
            color: $label-text;
            padding-bottom: 5px;
        }

        &-text {
            @include text;
            color: $text-color;

        }

        &-delete {
            display: flex;
            justify-content: space-between;
        }

        &-select {
            width: 100%;
            padding: 5px 10px;
            color: #333;
            @include dropdown-text;
        }
    }

    .input__default {
        background-color: $white;
        border: 1px solid $primary;
        box-shadow: inset 0px 0px 2px 1px $inner-shadow;
        border-radius: 3px;

        &:hover {
            background-color: $white;
            border: 1px solid $primary;
            box-shadow: inset 0px 0px 2px 1px $inner-shadow;
            border-radius: 3px;
        }

        &:focus {
            background-color: $white;
            border: 1px solid $primary;
            box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5);
            border-radius: 3px;
        }
    }

    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        font: inherit;
        letter-spacing: inherit;
        word-spacing: inherit;
        
        &:active {
            outline: none
        }

        &:focus {
            outline: none
        }
    }
</style>
