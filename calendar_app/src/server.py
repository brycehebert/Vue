from flask import *
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from key import mongoURI

# Flask instance
app = Flask(__name__)

# CORS
CORS(app)

# MongoDB Config
app.config['MONGODB_SETTINGS'] = {
    'host': mongoURI()
}

# MongoEngine Instance
db = MongoEngine(app)

# Mongo schema
class Event(db.Document):
    dayId = db.IntField(required = True)
    details = db.StringField(required = True)

# READ - Return all events 
@app.route('/get_all', methods=["GET"])
def get_all():
   return (jsonify(Event.objects), 200)

# CREATE - Add new event to DB
@app.route("/add_one", methods=["POST"])
def add_one():
    req = request.json
    newEvent = Event(dayId = req["dayId"], details = req["eventDetails"])
    newEvent.save()
    return (jsonify(newEvent), 200)

# UPDATE - Edit an event
@app.route("/update_one", methods=["PUT"])
def update_one():
    req = request.json
    newEvent = Event.objects.get_or_404(id = req["_id"]["$oid"]).update(details = req["newEventDetails"])
    return (jsonify(newEvent), 200)

# DELETE - Remove an event
@app.route("/delete_one", methods=["DELETE"])
def delete_one():
    req = request.json
    delEvent = Event.objects.get_or_404(id = req["_id"]["$oid"])
    delEvent.delete()
    return("Deleted", 200)

# Start server
if __name__ == '__main__':
    app.run(port = 8000, debug = True)