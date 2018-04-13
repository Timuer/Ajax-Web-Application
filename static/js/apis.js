var PATHS = {
	weiboAdd: "/api/weibo/add",
	weiboUpdate: "/api/weibo/update",
	weiboAll: "/api/weibo/all",
	weiboDel: "/api/weibo/del",
	todoAdd: "/api/todo/add",
	todoUpdate: "/api/todo/update",
	todoAll: "/api/todo/all",
	todoDel: "/api/todo/del",
}

var apiWeiboAdd = function(weibo, callback) {
	ajax("POST", PATHS.weiboAdd, weibo, callback)
}

var apiWeiboUpdate = function(weibo, callback) {
	ajax("POST", PATHS.weiboUpdate, weibo, callback)
}

var apiWeiboDel = function(id, callback) {
	path = PATHS.weiboDel + "?id=" + id
	ajax("GET", path, null, callback)
}

var apiWeiboAll = function(callback) {
	ajax("GET", PATHS.weiboAll, null, callback)
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
