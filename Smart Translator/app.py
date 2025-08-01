from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/traate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text')
    target_lang = data.get('target_lang')

    response = requests.post('https://libretranslate.de/translate', json={
        'q': text,
        'source': 'auto',
        'target': target_lang,
        'format': 'text'
    })

    translated = response.json()['translatedText']
    return jsonify({'translatedText': translated})
