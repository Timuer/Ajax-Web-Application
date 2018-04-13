from model.Weibo import Weibo
from utils import env
from objects import Response
import json
import time
from utils import json_response

def route_weibo(request):
	resp = Response()
	tmp = env.get_template("weibo.html").render()
	resp.body = tmp.encode("utf-8")
	return resp


def all(request):
	ws = Weibo.all()
	data = [w.__dict__ for w in ws]
	json_data = json.dumps(data, ensure_ascii=False, indent=2)
	return json_response(json_data)


def add(request):
	j = request.json()
	w = Weibo.new(j)
	w.save()
	return json_response(w.json())


def update(request):
	j = request.json()
	weibo_id = j.get("id", "")
	w = Weibo.find_by_id(weibo_id)
	updateWeibo(w, **j)
	w.delete(weibo_id)
	w.save()
	return json_response(w.json())


def updateWeibo(weibo, **args):
	for k, v in args.items():
		setattr(weibo, k, v)
	weibo.ut = time.time()


def delete(request):
	weibo_id = request.query().get("id", "")
	w = Weibo.find_by_id(weibo_id)
	w.delete(weibo_id)


weibo_routes_dict = {
	"/weibo": route_weibo,
	"/api/weibo/all": all,
	"/api/weibo/add": add,
	"/api/weibo/update": update,
	"/api/weibo/del": delete,
}