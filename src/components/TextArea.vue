<template>
    <textarea :value="value" v-bind="$attrs" @input="$emit('input', $event.target.value)"/>
</template>

<script>
export default {
    props: ['value']
}
</script>

<style lang="scss" scoped>

</style>
