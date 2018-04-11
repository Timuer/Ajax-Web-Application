import time
from model import Model


class Todo(Model):
	def __init__(self, form):
		self.id = self.getid()
		self.title = form.get("title", "")
		self.ct = time.time()
		self.ut = self.ct