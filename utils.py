import random
import time
import hashlib
from objects import Response
from jinja2 import Environment, FileSystemLoader
import os.path



path = "{}/templates/".format(os.path.dirname(__file__))
loader = FileSystemLoader(path)
env = Environment(loader=loader)


def get_local_time():
	return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

def log(*args, **kwargs):
	t = get_local_time()
	with open("server.log", 'a', encoding="utf-8") as f:
		print("log", t, *args, file=f, **kwargs)


def random_str():
	s = "alsdkfjasldfkjiennvoihwenflknv"
	result = ""
	for i in range(10):
		index = random.randint(0, len(s) - 2)
		result += s[index]
	return result


def encrypted_password(pwd, salt="todo"):
	return hashlib.md5((pwd + salt).encode("ascii")).hexdigest()

def json_response(data):
	resp = Response()
	resp.add_header("Content-Type", "application/json")
	resp.body = data.encode("utf-8")
	return resp