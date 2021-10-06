# Calendar App

A calendar app that utilizes Vue, Python, and MongoDB to keep track of events.

### Install/Run Instructions

Create a file `key.py` in `src` directory  which will contain a MongoDB URI.

Contents of `key.py`:

    def mongoURI():
        return "<Your MongoDB URI>"

Replace `<Your MongoDB URI>` with your personal MongoDB URI (preserve quotation marks).

Run the following commands from `calendar_app` directory.

    npm install
    npm run serve

    cd src
    pip install -r requirements.txt
    python server.py

Open http://localhost:8080 in browser and app should be running.

