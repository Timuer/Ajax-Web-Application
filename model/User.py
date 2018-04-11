from model import Model

class User(Model):
	def __init__(self, form):
		self.id = form.get("id", None)
		self.username = form.get("username", "")
		self.password = form.get("password", "")
		self.description = form.get("description", "")

	def validate_login(self):
		users = self.all()
		for u in users:
			if u.username == self.username and u.password == self.password:
				return u
		return None

	def validate_register(self):
		if len(self.username) < 2 or len(self.password) < 2:
			return False
		users = self.all()
		for u in users:
			if u.username == self.username:
				return False
		return True

