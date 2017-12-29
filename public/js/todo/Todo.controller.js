(function() {
    'use strict';
    jQuery.sap.require('todo.TodoPersistency');

    sap.ui.controller('todo.Todo', {
        model: null,
        store: new todo.TodoPersistency('todos'),
        list: [],
        onInit: function() {
            this.model = new sap.ui.model.json.JSONModel();
            this.model.setData({
                todolist: this.list
            })
            this.getView().setModel(this.model);
            this.model.setProperty('/todolist', [{
                    id: jQuery.sap.uid(),
                    Name: 'example....done!',
                    done: true
                },
                {
                    id: jQuery.sap.uid(),
                    Name: 'example...to be done',
                    done: false
                }
            ])
        },
        createTodo: function(todo) {
            todo = todo.trim();
            if (todo.length === 0) {
                return;
            }
            var todolist = this.model.getProperty('/todolist')
            todolist.push({
                id: jQuery.sap.uid(),
                Name: todo,
                done: false
            })
            this.model.setProperty('/todolist', todolist)
            this.model.updateBindings(true);

        },
        completeOne: function(todo) {
            todo.getModel().setProperty(todo.getPath() + '/done', !todo.getProperty('done'));
            this.model.updateBindings(true);

        },
        todosSelected: function(mode) {
            var obindings = this.getView().getList().getBinding("items");
            if (mode === 'ActiveTodos') {
                obindings.filter(new sap.ui.model.Filter('done',
                    sap.ui.model.FilterOperator.EQ, false));
            } else if (mode === 'CompletedTodos') {
                obindings.filter(new sap.ui.model.Filter('done',
                    sap.ui.model.FilterOperator.EQ, true));
            } else if (mode === 'AllTodos') {
                obindings.filter([]);
            }
            // console.log(mode)
            // console.log(this.getView().getList().getBinding("items"))
            // var lis = sap.ui.getCore().byId("todoList")
            // lis.getBinding("items").filter(new sap.ui.model.Filter('done',
            //     sap.ui.model.FilterOperator.EQ, false));
            // var oBinding = list.getBinding("items");
            // if (mode === "ActiveTodos") {
            // console.log("act")
            // console.log(this.getView().getModel())
            // this.getView().getList().getBinding("items").filter(new sap.ui.model.Filter('done',
            //     sap.ui.model.FilterOperator.EQ, false));

            // }
            // alert(1)
            // console.log(this.getView().getSelectedButton())
        },
        clearCompletedTodos: function() {
            console.log("pre")
            var todos = this.model.getProperty('/todolist');
            for (var i = todos.length - 1; i >= 0; i--) {
                if (todos[i].done === true) {
                    todos.splice(i, 1);
                }
            }
            this.model.setProperty('/todolist', todos);
            this.model.updateBindings(true);

        },
        toggleAll: function(selected) {
            var todos = this.model.getProperty('/todolist');
            for (let item of todos) {
                item.done = selected;
            }
            this.model.updateBindings(true);
        },
        clearTodo: function(todo) {
            let id = todo.getProperty("id");
            let todos = this.model.getProperty('/todolist');
            for (let i = todos.length - 1; i >= 0; i--) {
                if (todos[i].id === id) {
                    todos.splice(i, 1);
                }
            }
            this.model.setProperty('/todolist', todos);
            this.model.updateBindings(true);

        }

    })
})()