from model import Model
import time


class Weibo(Model):
	def __init__(self, form):
		self.id = self.getid()
		self.title = form.get("title", "")
		self.author = form.get("author", "")
		self.article = form.get("article", "")
		self.votes = form.get("votes", 0)
		self.ct = time.time()
		self.ut = self.ct