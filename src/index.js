Vue.component('child', {
    template: '#child',
    data: function () {
        return {
            msg: 1
        };
    },
    methods: {
        add: function () {
            this.Etrigger('add', this.msg);
        }
    }
});
var vm = new Vue({
    el: '#app',
    data: {
        msg: 1
    },
    methods: {
        add: function (count) {
            this.msg += count || 1;
        },
        startListen() {
            this.Eon('add', this.add);
        },
        cancelListen() {
            this.Eoff('add', this.add);
        },
        listenOnce() {
            this.Eonce('add', this.add);
        },
    }
});
var vm2 = new Vue({
    el: '#app2',
    data: {
        msg: 2
    },
    methods: {
        add: function (count) {
            this.Etrigger('add', this.msg);
        }
    }
});