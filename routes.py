from objects import Response
from jinja2 import Environment, FileSystemLoader
import os.path


path = "{}/templates/".format(os.path.dirname(__file__))
loader = FileSystemLoader(path)
env = Environment(loader=loader)


def redirect(url):
	response = Response()
	response.status = 302
	response.add_header("Location", url)
	return response


def route_static(request):
	resp = Response()
	filename = request.query().get("file", "")
	path = ""
	if filename.endswith(".jpg"):
		resp.add_header("Content-Type", "image/jpeg")
		path = "static/img/" + filename
	elif filename.endswith(".js"):
		resp.add_header("Content-Type", "application/javascript")
		path = "static/js/" + filename
	elif filename.endswith(".css"):
		resp.add_header("Content-Type", "text/css")
		path = "static/css/" + filename
	with open(path, "rb") as f:
		resp.body = f.read()
	return resp


def route_index(request):
	resp = Response()
	resp.add_header("Content-Type", "text/html; charset=UTF-8")
	tmp = env.get_template("index.html").render()
	resp.body = tmp.encode("utf-8")
	return resp


def error(request, error_code=404):
	resp = Response()
	resp.status = error_code
	resp.description = "Not Found"
	e = {
		404: b"<h1>NOT FOUND</h1>"
	}
	resp.body = e.get(error_code)
	return resp


routes_dict = {
	"/": route_index,
	"/index": route_index,
	"/static": route_static,
}
