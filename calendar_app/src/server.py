from flask import *
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from key import mongoURI

app = Flask(__name__)

CORS(app)

app.config['MONGODB_SETTINGS'] = {
    'host': mongoURI()
}

db = MongoEngine(app)

class Event(db.Document):
    dayId = db.IntField(required = True)
    details = db.StringField(required = True)

@app.route('/get_all', methods=["GET"])
def get_all():
   return (jsonify(Event.objects), 200)

@app.route("/add_one", methods=["POST"])
def add_one():
    req = request.json
    newEvent = Event(dayId = req["dayId"], details = req["eventDetails"])
    newEvent.save()
    return (jsonify(newEvent), 200)

@app.route("/update_one", methods=["PUT"])
def update_one():
    req = request.json
    newEvent = Event.objects.get_or_404(id = req["_id"]["$oid"]).update(details = req["newEventDetails"])
    return (jsonify(newEvent), 200)

@app.route("/delete_one", methods=["DELETE"])
def delete_one():
    req = request.json
    delEvent = Event.objects.get_or_404(id = req["_id"]["$oid"])
    delEvent.delete()
    return("Deleted", 200)

if __name__ == '__main__':
    app.run(port = 8000, debug = True)