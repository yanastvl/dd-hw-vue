<template>
    <input :value="value" v-bind="$attrs" v-on="$listeners"/>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        value: String
    },
    computed: {
        listeners() {
            var vm = this
            return Object.assign({},
            this.$listeners,
            {
                input: function (event) {
                    vm.$emit('input', event.target.value)
                    }
                }
            )
        }
    },
    methods: {
        onInput(event) {
            this.$emit('input', event.target.value)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/vars.scss';
	@import '../scss/components/authorization.scss';
    @import '../scss/components/buttons.scss';
</style>
