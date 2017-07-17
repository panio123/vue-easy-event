# Simple event bus for vue.js/简单的vue event bus

## Installation/安装

``` bash

npm i vue-event-bus

```

## API

### `Eon`

#### 监听事件，传入事件名称(event)和句柄(handle)

``` js

    // @event - string
    // @handle - function
    this.Eon(event,handle);

```

### `Eonce`

#### 监听一次

``` js

    // @event - string
    // @handle - function
    this.Eonce(event,handle);

```

### `Eoff`

#### 取消监听，传入事件名称和句柄

``` js

    // @event - string
    // @handle - function
    this.Eoff(event,handle);

```

### `Etrigger`

#### 触发事件，传入事件名称，需要传递参数时使用data

``` js

    // @event - string
    // @data - object
    this.Etrigger(event,data);

```

### 匿名函数可以监听，但是无法取消监听。


### Usage

``` js
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

```

### evet bus 虽然方便，但是仅仅适合非常小型简单的项目，否则还请使用vuex