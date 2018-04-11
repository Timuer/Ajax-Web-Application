var PATHS = {
	todoAdd: "/api/todo/add",
	todoUpdate: "/api/todo/update",
	todoAll: "/api/todo/all",
	todoDel: "/api/todo/del",
}

var apiTodoAdd = function(todo, callback) {
	ajax("POST", PATHS.todoAdd, todo, callback)
}

var apiTodoUpdate = function(todo, callback) {
	ajax("POST", PATHS.todoUpdate, todo, callback)
}

var apiTodoDel = function(id, callback) {
	path = PATHS.todoDel + "?id=" + id
	ajax("GET", path, null, callback)
}

var apiTodoAll = function(callback) {
	ajax("GET", PATHS.todoAll, null, callback)
}
