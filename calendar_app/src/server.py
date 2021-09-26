from flask import Flask
from flask_mongoengine import MongoEngine
from key import mongoURI

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': mongoURI()
}

db = MongoEngine(app)

class Todos(db.Document):
    title = db.StringField(max_length=200, required=True)

@app.route('/', methods=["GET"])
def add_one():
   todo = Todos(title="some title")
   res = todo.save()
   print(res)
   return ("Hello", 200)

if __name__ == '__main__':
    app.run(port = 8080, debug = True)