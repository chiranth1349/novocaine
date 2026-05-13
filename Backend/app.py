from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/api/data")
def data():
    return jsonify({
        "fps": round(random.uniform(28, 35), 1),
        "confidence": round(random.uniform(88, 99), 1),
        "battery": random.randint(60, 100),
        "target": "UAV"
    })

if __name__ == "__main__":
    app.run(port=5000)