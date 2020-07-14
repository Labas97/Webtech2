<template>
    <div class="text-center">
        <h3>{{ response }}</h3>
        <img src="../assets/logo.png" alt="logo">
        <h2>ÜDV AZ ESZKÖZRAKTÁRBAN, JELENTKEZZ BE / REGISZTRÁLJ!</h2>
        <form class="form-signin" onsubmit="return false">
            <input type="email" placeholder="Email" required v-model="formInput.email"/>
            <input type="password" placeholder="Jelszó" required v-model="formInput.password"/>
            <button class="button" type="submit" v-on:click="signIn">Belépés</button>
            <button class="button" type="submit" v-on:click="signUp">Regisztráció</button>
        </form>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Login",
        data() {
            return {
                response: "",
                formInput: {
                    email: "",
                    password: ""
                },
                validEmail: false
            };
        },

        mounted() {},
        methods: {
            signUp: function() {
                if(!this.validateEmail()) return
                axios({
                    method: "post",
                    url: "http://localhost:3000/signup",
                    data: this.$data.formInput,
                    headers: { "content-type": "application/json" }
                }).then(
                    result => {
                        this.$data.response = result.data;
                    },
                    error => {
                        console.error(error)
                        this.$data.response = error.response.data
                    }
                );
            },
            signIn: function() {
                if(!this.validateEmail()) return
                axios({
                    method: "post",
                    url: "http://localhost:3000/signin",
                    data: this.$data.formInput,
                    headers: { "content-type": "application/json" }
                }).then(
                    result => {
                        if(result.status === 200) {
                            this.$data.response = result.data;
                            window.location.href='/add'
                        }
                    },
                    error => {
                        console.error(error)
                        this.$data.response = error.response.data
                    }
                )
            },
            validateEmail: function() {
                const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/
                return reg.test(this.$data.formInput.email)
            }
        }
    };

</script>

<style scoped>

    img {
        background-color: coral;
    }

    h3 {
        background-color: coral;
    }

    h2 {
        margin-top: 10px;
        margin-bottom: 30px;
    }

    .form-signin {
        margin-top: -10px;
        background-color: coral;
    }

</style>>
