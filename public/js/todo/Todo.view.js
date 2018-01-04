(function() {
    'use strict';
    sap.ui.jsview("todo.Todo", {
        getControllerName: function() {
            return "todo.Todo";
        },
        controls: [],
        createContent: function(oController) {
            var completeAll = new sap.m.CheckBox({})
                .attachSelect(function() {
                    oController.toggleAll(this.getSelected())
                })
                // this.controls.push(completeAll);

            var inputBox = new sap.m.Input("inputSilence", {
                showIcon: true,
                placeholder: "what needs to be done",
                width: "40em"

            }).attachSubmit(function() {
                oController.createTodo(this.getProperty('value'));
                this.setValue('');
            });
            inputBox.data('sap-sf-automation-input', 'silenceInp', true);
            debugger;

            // this.controls.push(inputBox);
            var horizen = new sap.ui.layout.HorizontalLayout({
                content: [
                    completeAll, inputBox
                ]
            });
            this.controls.push(horizen);
            var rows = new sap.m.List("todoList", {
                    mode: sap.m.ListMode.MultiSelect,
                    width: "43em",
                    //includeItemInSelection: true,
                    items: {
                        path: "/todolist",
                        template: new sap.m.InputListItem({
                                title: "{Name}",
                                label: "{Name}",
                                // text: "{Name}",
                                selected: "{done}",
                                type: sap.m.ListType.Active,
                                //don't forget set type unless it will not be fired
                                content: new sap.m.Button({
                                    text: 'Delete'
                                }).attachPress(function() {
                                    oController.clearTodo(this.getBindingContext());
                                })
                            })
                            .attachPress(function() {
                                oController.completeOne(this.getBindingContext())
                            })
                    }
                })
                // .attachSelectionChange((event) => {
                //     console.log("attachSelectionChange")
                //     console.log(this.getBindingContext())
                //     console.log(event.getSource())
                // })
                // .attachItemPress(() => {
                //     console.log("attachItemPress")
                //     console.log(this)


            // });
            this.controls.push(rows);

            this.list = rows;

            var itemsleft = new sap.m.Label("openNums", {
                text: {
                    path: "/todolist",
                    formatter: function(items) {
                        var numberOfOpenItems = 0;
                        items.forEach(function(todo) {
                            if (todo.done === false) {
                                numberOfOpenItems++;
                            }
                        });
                        return numberOfOpenItems === 1 ? '1 item left' : numberOfOpenItems + ' items left';
                    }
                }
            })
            this.controls.push(itemsleft);

            var todosSelection = new sap.m.SegmentedButton({
                id: 'TodosSelection',
                items: [new sap.m.SegmentedButtonItem('AllTodos', {
                        id: 'AllTodos',
                        text: 'All'
                    }), new sap.m.SegmentedButtonItem({
                        id: 'ActiveTodos',
                        text: 'Active'
                    }), new sap.m.SegmentedButtonItem({
                        id: 'CompletedTodos',
                        text: 'Completed'
                    })

                ]
            }).attachSelect(function() {
                oController.todosSelected(this.getSelectedButton().split("-")[0]);
            });
            todosSelection.setSelectedButton('AllTodos');
            this.controls.push(todosSelection)

            var clearCompleted = new sap.m.Button('ClearCompletedTodos', {
                    text: 'Clear Completed',
                    visible: {
                        path: '/todolist',
                        formatter: function(todos) {
                            return todos.some(function(element, index, array) {
                                return element.done === true;
                            });
                        }
                    }
                })
                .attachPress(function() {
                    oController.clearCompletedTodos()
                })
            this.controls.push(clearCompleted)

            return this.controls;
        },
        getList: function() {
            return this.list
        }

    });
})()