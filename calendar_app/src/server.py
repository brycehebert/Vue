from pymongo import MongoClient
from flask import Flask
from key import mongoURI
app = Flask(__name__)
client = MongoClient(mongoURI())
db = client.Python

try:
    client.server_info()
    print("Connected to MongoDB.")
except Exception:
    print("Unable to connect to MongoDB.")
    exit()

@app.route('/', methods=["GET"])
def add_one():
   res = db.todos.insert_one({"title" : "Todo Title", "body":"todo body"})
   print(res)
   return ("Hello", 200)

if __name__ == '__main__':
    app.run(port=8080)