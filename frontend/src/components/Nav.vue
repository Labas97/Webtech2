<template>
    <nav>
        <router-link to="/add">
            <strong><a class="nav-link">Új eszköz</a></strong>
        </router-link>
        <router-link to="/list">
            <strong><a class="nav-link">Eszköz raktár</a></strong>
        </router-link>
        <button class="button" v-on:click="logOut">Kijelentkezés</button>
    </nav>
</template>

<script>
    export default {
        name: "Nav",
        methods: {
            logOut: function() {
                window.location.href = "/login";
            }
        }
    };
</script>

<style>
    nav{
        background-color: firebrick !important;
    }

    button {
        margin-top: 10px;
        margin-bottom: 20px;
        margin-left: 15px;
    }
</style>