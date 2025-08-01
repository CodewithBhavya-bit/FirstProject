from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from mychat import get_response  # Make sure this function exists in mychat.py

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("base.html")

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    if not text:
        return jsonify({"answer": "Sorry, I didn't understand."})
    
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)

