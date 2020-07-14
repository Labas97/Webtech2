import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Add from './components/Add'
import List from './components/List'

// Middleware
Vue.use(VueRouter)

const routes = [
    { path: '/login', component: Login },
    { path: '/add', component: Add },
    { path: '/list', component: List },
    {
        path: '*', redirect: '/login'
    }
]

const router = new VueRouter({
    routes,
    mode :'history'
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
console.log("Vue app is ready")
