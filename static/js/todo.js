var renderTodoTemplate = function(todo) {
	var id = todo.id
	var title = todo.title
	var ct = todo.ct
	var ut = todo.ut
	var todoPane = `
			<tr class="todo-pane" id="todo-pane-${id}" data-id="${id}">
				<td class="todo-title">${title}</td>
				<td class="todo-ct">${ct}</td>
				<td class="todo-ut">${ut}</td>
				<td><button class="edit-btn">编辑</button></td>
				<td><button class="del-btn">删除</button></td>
			</tr>
	`
	return todoPane
}

var insertTodos = function(fragment) {
	var todoList = e(".todo-list")
	todoList.insertAdjacentHTML("beforeend", fragment)
}

var loadTodos = function() {
	var load = function(resp) {
		todos = JSON.parse(resp)
		var fragment = ""
		for(var i = 0; i < todos.length; i++) {
			var t = todos[i]
			fragment += renderTodoTemplate(t)
		}
		insertTodos(fragment)
	}
	apiTodoAll(load)
}

// 点击添加按钮

var addTodo = function() {
	var title = e("#add-text").value
	var todo = {
		title: title
	}
	var updatePage = function(resp) {
		var tmp = renderTodoTemplate(JSON.parse(resp))
		insertTodos(tmp)
	}
	apiTodoAdd(todo, updatePage)
}

// 点击编辑按钮

var renderEditTemplate = function(id) {
	var editTemplate = `
		<td class="update-pane">
		<input type="text" class="update-todo-title" data-id="${id}">
		<button class="update-btn">更新</button>
		</td>
	`
	return editTemplate
}

var editTodo = function(targetElem) {
	var pane = targetElem.closest(".todo-pane")
	var tmp = renderEditTemplate(pane.dataset.id)
	pane.insertAdjacentHTML("beforeend", tmp)
}

// 点击更新按钮

var updateTodo = function(targetElem) {
	var pane = targetElem.closest(".todo-pane")
	var id = pane.dataset.id
	var title = pane.querySelector(".update-todo-title").value
	var todo = {
		id: id,
		title: title,
	}
	var updatePage = function(resp) {
		var t = JSON.parse(resp)
		var id = t.id
		var selector = "#todo-pane-" + id
		var todoPane = e(selector)
		todoPane.querySelector(".todo-title").innerText = t.title
		todoPane.querySelector(".todo-ut").innerText = t.ut
		todoPane.querySelector(".update-pane").remove()
	}
	apiTodoUpdate(todo, updatePage)
}

// 点击删除按钮

var deleteTodo = function(id) {
	e("#todo-pane-" + id).remove()
	apiTodoDel(id, function() {
		console.log("删除成功")
	})
}

// 绑定各个事件

var bindEvents = function() {
	var todoList = e(".todo-list")
	todoList.addEventListener("click", function(event) {
		var targetElem = event.target
		var cl = targetElem.classList
		if (cl.contains("edit-btn")) {
			editTodo(targetElem)
		} else if (cl.contains("update-btn")) {
			updateTodo(targetElem)
		} else if (cl.contains("del-btn")) {
			var id = targetElem.closest(".todo-pane").dataset.id
			deleteTodo(id)
		}
	})
	var addBtn = e(".add-btn")
	addBtn.addEventListener("click", function(event) {
		addTodo()
	})
}

var _main = function() {
	loadTodos()
	bindEvents()
}

_main()

// 1. 发送获取Todo主页的请求
// 2. 发送获取所有todo的AJAX请求，并且将todo插入模板，更新到页面中。（loadTodos）
// 3. 为页面中的元素绑定所有事件
// 	3.1 点击添加按钮发送AJAX添加Todo请求，将返回的Todo更新到页面。（addTodo）
// 	3.2 点击编辑按钮在页面中插入一个输入框和按钮（editTodo）
// 	3.3 点击更新按钮将发送输入框中的内容（updateTodo）
// 	3.4 点击删除按钮发送删除Todo请求，更新页面
