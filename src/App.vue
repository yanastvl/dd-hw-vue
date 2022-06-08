<template>
	<div class="app" :id="app">
        <Header></Header>
		<router-view></router-view>
	</div>
</template>


<script>
import Header from "./components/Header.vue";

export default {
    data() {
        return {
            app: "my-app"
        };
    },
    components: { Header }
}
</script>
