<template>
    <section class="authorization">
            <form @submit="handleSubmit">
                <div class="authorization-inner">
                    <h2 class="authorization-text">
                        Авторизация
                    </h2>
                    <div class="authorization__input-inner">
                        <label htmlFor="login" class="authorization__input-text">Логин</label>
                        <input 
                            type="text" 
                            :class="`authorization__input-input ${!login ? 'input__empty' : 'input__default'} ${error && 'input__error'}`"
                            name="login" 
                            v-model="login"
                            @change="handleChange"
                            required
                        >
                    </div>
                    <div class="authorization__input-inner authorization__password">
                        <label htmlFor="login" class="authorization__input-text">Пароль</label>
                        <input 
                            type="password" 
                            :class="`authorization__input-input ${!password ? 'input__empty' : 'input__default'} ${error && 'input__error'}`"
                            name="password" 
                            v-model="password"
                            @change="handleChange"
                            required
                        >
                    </div>
                    <div :class="`authorization-error ${!error && 'hidden'}`">{{ errorMessage }}</div>
                    <div class="authorization__button-inner">
                        <button class="authorization__input-button success-button">Вход</button></div>
                </div>
            </form>
        </section>
</template>

<script>
import { global } from '../entry.js';
import api from '@/api'

export default ({
    data() {
        return {
            login: 'username',
            password: 'password',
            form: {"login": ""},
            error: false,
            errorMessage: "---"
        }
    },
    methods: {
        handleChange() {
            this.error = false;
        },
        handleSubmit(e) {
            e.preventDefault();
            api.Auth.login({
                login: this.login,
                password: this.password
            }
            ).then((response) => {
                const user = JSON.stringify(response);
                localStorage.setItem('user', user);
                global.$emit('setUser', user);
                this.$router.push({name: "TaskListView"});
            }, () => {
                this.errorMessage = "Неправильный логин или пароль";
                this.error = true;
            });
        }
    }
})
</script>

<style lang="scss" scoped>
  @import '../scss/vars.scss';
  @import '../scss/_mixins.scss';

  @import '../scss/components/authorization.scss';
  @import '../scss/components/buttons.scss';
</style>