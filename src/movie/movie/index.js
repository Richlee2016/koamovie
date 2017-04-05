import Vue from 'vue'
import App from './movie.vue'


const app = new Vue({
    render: h => h(App)
}).$mount('#app')