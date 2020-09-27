from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_session import Session
from tempfile import mkdtemp
from passlib.hash import pbkdf2_sha256 as pw
from flask_sqlalchemy import SQLAlchemy
from helpers import format_resp, login_required
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
db = SQLAlchemy(app)

@app.route('/')
def running():
    return jsonify('Flask Server Running')

@app.route('/register', methods=['POST'])
def register():
    details = request.get_json()
    hash_pw = pw.hash(details['password'])
    resultproxy = db.session.execute('INSERT INTO users (username,hash,email) VALUES (:1, :2, :3) RETURNING id', {'1': details['username'], '2':hash_pw, '3':details['email']})
    db.session.commit()
    response = format_resp(resultproxy)
    return jsonify(response)

@app.route('/login', methods=['POST'])
def login():
    session.clear()
    details= request.get_json()
    resultproxy = db.session.execute('SELECT * FROM users WHERE username = :username',{'username': details['username']})
    db.session.flush()
    response = format_resp(resultproxy)

    if len(response) == 0:
        return jsonify('User Does Not Exist')
    else:
        if (pw.verify(details['password'], response[0]['hash'])):
            session["id"] = response[0]["id"]
            return jsonify(session.get("id"))
        else:
            return jsonify("User Found, Password Incorrect")
 

### TEST/DEBUG ROUTES

@app.route('/check', methods=['GET'])
@login_required
def check():
    # resultproxy = db.session.execute('SELECT * FROM users where id = :id', {'id': session.get("id")})
    resultproxy = db.session.execute('SELECT * FROM users')
    response = format_resp(resultproxy)
    return jsonify(response)

@app.route('/token', methods=['GET'])
def add():
    session["id"] = 1
    return jsonify("Test ID 1 set")

@app.route('/clear')
def clear():
    session.clear()
    return jsonify("Test ID cleared")

@app.route('/denied')
def denied():
    return jsonify("Access Denied")

app.run(debug=True)

##ADD 405 Route Redirect