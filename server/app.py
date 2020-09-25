from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_session import Session
from tempfile import mkdtemp
from passlib.hash import pbkdf2_sha256 as pw


app = Flask(__name__)
CORS(app)

@app.route('/')
def running():
    return jsonify('Flask Server Running')

@app.route('/register', methods=['POST'])
def register():
    return jsonify('register')

@app.route('/login', methods=['GET', 'POST'])
def login():
    return jsonify('login')




app.run(debug=True)
