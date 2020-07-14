<template>
    <div>
        <Nav />
        <table>
            <tr>
                <th>IMEI (Termék szám)</th>
                <th>Név</th>
                <th>Raktár</th>
                <th>Város</th>
            </tr>
            <tbody>
            <tr v-bind:key="user.imei" v-for="user in users">
                <td>{{ user.imei }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.warehouse }}</td>
                <td>{{ user.city }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import axios from "axios"
    import Nav from "./Nav.vue";

    export default {
        components: {
            Nav
        },
        data() {
            return {
                response: "",
                users: [],
                validEmail: false
            };
        },
        mounted() {
            this.getItems()
        },
        methods: {
            getItems: function() {
                axios({
                    method: "get",
                    url: "http://localhost:3000/warehouse",
                    headers: { "content-type": "application/json" }
                }).then(
                    result => {
                        if(result.status === 200) {
                            this.$data.users = result.data;
                        }
                    },
                    error => {
                        console.error(error)
                        this.$data.response = error.response.data
                    }
                )
            },
            logOut: function() {
                window.location.href = "/login";
            },

        }
    };
</script>
<style>
    table {
        width: 100%;
        background-color: beige;
    }
</style>>
