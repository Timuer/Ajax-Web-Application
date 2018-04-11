from model.Todo import Todo
import json
from utils import json_response
import time
from routes import env
from objects import Response
from utils import log


def route_todo(request):
	resp = Response()
	tmp = env.get_template("todo.html").render()
	resp.body = tmp.encode("utf-8")
	return resp


def all(request):
	todos = Todo.all()
	data = [t.__dict__ for t in todos]
	json_data = json.dumps(data, ensure_ascii=False, indent=2)
	return json_response(json_data)


def add(request):
	j = request.json()
	todo = Todo.new(j)
	todo.save()
	return json_response(todo.json())


def update(request):
	j = request.json()
	todo_id = j.get("id", "")
	todo_title = j.get("title", "")
	todo = Todo.find_by_id(todo_id)
	todo.title = todo_title
	todo.ut = time.time()
	todo.delete(todo_id)
	todo.save()
	return json_response(todo.json())


def delete(request):
	todo_id = request.query().get("id", "")
	todo = Todo.find_by_id(todo_id)
	todo.delete(todo_id)


todo_routes_dict = {
	"/todo": route_todo,
	"/api/todo/all": all,
	"/api/todo/add": add,
	"/api/todo/update": update,
	"/api/todo/del": delete,
}