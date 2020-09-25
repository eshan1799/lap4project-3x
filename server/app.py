from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_session import Session
from tempfile import mkdtemp
from passlib.hash import pbkdf2_sha256 as pw
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres:///finance'
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

    # if request.method == 'POST':
        

    return jsonify("login")

@app.route('/check', methods=['GET'])
def check():
    resultproxy = db.session.execute('SELECT * FROM users')
    d, a = {}, []
    for rowproxy in resultproxy:
        # rowproxy.items() returns an array like [(key0, value0), (key1, value1)]
        for column, value in rowproxy.items():
            # build up the dictionary
            d = {**d, **{column: value}}
        a.append(d)
    return jsonify(a)


app.run(debug=True)
