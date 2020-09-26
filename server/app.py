from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_session import Session
from tempfile import mkdtemp
from passlib.hash import pbkdf2_sha256 as pw
from flask_sqlalchemy import SQLAlchemy
from helpers import format_resp
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
db = SQLAlchemy(app)

@app.route('/')
def running():
    return jsonify('Flask Server Running')

@app.route('/register', methods=['POST'])
def register():
    return jsonify('register')

@app.route('/login', methods=['GET','POST'])
def login():
    # Forget any user_id
    session.clear()
    details= request.get_json()
    

    if request.method == "POST":
        resultproxy = db.session.execute('SELECT * FROM users WHERE username = :username',{'username': details['username']})
        response = format_resp(resultproxy)

        if len(response) == 0:
            return jsonify('user does not exist')
        else:
            return jsonify('Found')
              
    else:
        return jsonify("login GET route")

@app.route('/check', methods=['GET'])
def check():
    resultproxy = db.session.execute('SELECT * FROM users')
    response = format_resp(resultproxy)
    return jsonify(response)


app.run(debug=True)
