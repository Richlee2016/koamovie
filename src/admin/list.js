import Vue from 'vue'
var List = new Vue({
    el: '#list',
    data: {
        list: JSON.parse('<%- JSON.stringify(movies) %>')
    },
    methods: {
        del(id, i) {
            this.list.splice(i, 1);
            axios.delete('/admin/movie/list/delete/' + id)
                .then(res => {
                    alert(res.data.msg);
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    mounted() {
        console.log(this.list);
    }
});