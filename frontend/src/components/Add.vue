<template>
    <div class="colored">
        <Nav />
        <div class="container">
            <div class="mt-5">
                <form onsubmit="return false">
                    <table>
                        <strong><label for="name">Név</label></strong>
                        <input type="text" v-model="formInput.name" autofocus required />
                        <strong><label for="imei">IMEI (Termék szám)</label></strong>
                        <input type="text" pattern="[0-9]{11}" v-model="formInput.imei" required />
                        <strong><label for="warehouse">Raktár</label></strong>
                        <input type="text" v-model="formInput.warehouse" required />
                        <strong><label for="city">Város</label></strong>
                        <input type="text" v-model="formInput.city" required />
                        <button class="button" v-on:click="addNewItem"><strong>Mentés</strong></button>
                    </table>
                </form>
            </div>
        </div>
        <h3 v-if='this.$data.response !== ""'>{{ response }}</h3>
    </div>
</template>

<script>
    import axios from "axios";
    import Nav from "./Nav.vue"

    export default {
        name: "Home",
        components: {
            Nav
        },
        data() {
            return {
                response: "",
                formInput: {
                    name: "",
                    imei: "",
                    warehouse: "",
                    city: ""
                },
            };
        },

        mounted() {},
        methods: {
            addNewItem: function() {
                if (!this.validateForm()) return;
                axios({
                    method: "post",
                    url: "http://localhost:3000/warehouse",
                    data: this.$data.formInput,
                    headers: { "content-type": "application/json" }
                }).then(
                    result => {
                        console.log(result);
                        this.$data.response = result.data;
                        alert("Mentve!");
                    },
                    error => {
                        console.error(error);
                        this.$data.response = error.response.data;
                    }
                );
            },
            validateForm: function() {
                const formInput = this.$data.formInput;
                if (
                    formInput.name.trim() === "" ||
                    formInput.imei.trim() === "" ||
                    formInput.warehouse.trim() === "" ||
                    formInput.city.trim() === ""
                ) {
                    return false;
                }
                else if (!this.$data.formInput.imei.match(/^\d{11}$/)){
                    alert("IMEI 11db számból áll!");
                    return false;
                }
                return true;
            }
        }
    };
</script>

<style scoped>

    button {
        margin-top: 30px;
        margin-bottom: 30px;
        margin-left: 0px;
    }

    h3 {
        background-color: beige !important;
        margin-top: 2rem;
        text-align: center;
    }
    .container {
        background-color: beige !important;
    }
    .colored {
        background-color: beige !important;
    }
    table {
        width: 10% !important;
    }
</style>