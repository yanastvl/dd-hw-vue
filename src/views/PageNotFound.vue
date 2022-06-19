<template>
	<div>
		<p>Страница не найдена</p>
        <router-link :to="taskList">Перейти на главную</router-link>
	</div>
</template>

<script>
export default {
	data() {
		return {
			taskList: {
                name: "TaskListView"
            },
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
