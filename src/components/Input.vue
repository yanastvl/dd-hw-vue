<template>
    <input :value="value" v-bind="$attrs" @input="$emit('input', $event.target.value)" @change="$emit('error', false)"/>
</template>

<script>
export default {
    props: ['value']
}
</script>

<style lang="scss" scoped>
</style>
