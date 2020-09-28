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
    details = request.get_json()

    resultproxy = db.session.execute('SELECT * FROM users WHERE username = :1', {'1': details['username']})
    response = format_resp(resultproxy)
    if (len(response) == 1):
        return jsonify("Username Taken")
    

    resultproxy = db.session.execute('SELECT * FROM users WHERE email = :1', {'1': details['email']})
    response = format_resp(resultproxy)
    if (len(response) == 1):
        return jsonify("Email Already Registered to Account")

    hash_pw = pw.hash(details['password'])
    resultproxy = db.session.execute('INSERT INTO users (username,hash,email) VALUES (:1, :2, :3) RETURNING id', {'1': details['username'], '2':hash_pw, '3':details['email']})
    db.session.commit()
    response = format_resp(resultproxy)
    return jsonify(response)

@app.route('/login', methods=['POST'])
def login():
    session.clear()
    details = request.get_json()
    resultproxy = db.session.execute('SELECT * FROM users WHERE username = :1',{'1': details['username']})
    response = format_resp(resultproxy)

    if len(response) == 0:
        return jsonify('User Does Not Exist')
    else:
        if (pw.verify(details['password'], response[0]['hash'])):
            session["id"] = response[0]["id"]
            return jsonify(session.get("id"))
        else:
            return jsonify("User Found, Password Incorrect")
'''NOTE: ADD 405 Route Redirect!!!'''

@app.route('/portfolio', methods=['GET'])
@login_required
def portfolio():
    balance = db.session.execute('SELECT balance FROM balance WHERE id = :1', {'1': session.get("id")})
    balance_val = format_resp(balance)
    balance_round = round(balance_val[0]['balance'],2)
    equity = db.session.execute('SELECT user_id, SUM(position) AS sum FROM portfolio GROUP BY user_id HAVING user_id = :1', {'1': session.get('id')})
    equity_val = format_resp(equity)
    equity_round = round(equity_val[0]['sum'], 2)
    stocks = db.session.execute('SELECT * FROM portfolio WHERE user_id = :1',{'1': session.get("id")})
    stock_list = format_resp(stocks)
    portfolio = {'cash': balance_round, 'equity': equity_round,'portfolio': stock_list}
    return jsonify(portfolio)

@app.route('/buy', methods=['POST', 'PATCH'])
# @login_required
def buy():
    session["id"] = 1
    buy_order = request.get_json()
    
    if request.method == 'POST':
        db.session.execute('INSERT INTO history (user_id, ticker, action, shares, price) VALUES (:1, :2, :3, :4, :5)', {'1': session.get('id'), '2': buy_order['ticker'], '3': 'buy', '4': buy_order['shares'], '5': buy_order['price']})
        db.session.execute('INSERT INTO portfolio (user_id, ticker, name, exchange, shares, price) VALUES (:1, :2, :3, :4, :5, :6)', {'1': session.get('id'), '2': buy_order['ticker'], '3': buy_order['name'], '4': buy_order['exchange'], '5': buy_order['shares'], '6': buy_order['price']})
        db.session.execute('UPDATE balance SET balance = balance - :1 WHERE user_id = :2', {'1': (buy_order['shares'] * buy_order['price']), '2': session.get('id')})
        db.session.commit()
        return jsonify (200)
    
    if request.method == 'PATCH':
        db.session.execute('INSERT INTO history (user_id, ticker, action, shares, price) VALUES (:1, :2, :3, :4, :5)', {'1': session.get('id'), '2': buy_order['ticker'], '3': 'buy', '4': buy_order['shares'], '5': buy_order['price']})
        db.session.execute('UPDATE portfolio SET shares = shares + :1,  price = :2 WHERE user_id = :3 AND ticker = :4', {'1': buy_order['shares'],'2': buy_order['price'], '3': session.get('id'), '4': buy_order['ticker']})
        db.session.execute('UPDATE balance SET balance = balance - :1 WHERE user_id = :2', {'1': (buy_order['shares'] * buy_order['price']), '2': session.get('id')})
        db.session.commit()
        return jsonify(200)

    

@app.route('/sell', methods=['PATCH'])
# @login_required
def sell():
    session["id"] = 1
    sell_order = request.get_json()

    # if request.method == 'POST':
    #     db.session.execute('INSERT INTO history (user_id, ticker, action, shares, price) VALUES (:1, :2, :3, :4, :5', {'1': session.get('id'), '2': sell_order['ticker'], '3': 'sell', '4': sell_order['shares'], 5: sell_order['price']})
    #     db.session.execute('INSERT INTO portfolio (user_id, ticker, name, exchange, shares, price) VALUES (:1, :2, :3, :4, :5, :6', {'1': session.get('id'), '2': sell_order['ticker'], '3': sell_order['name'], '4': sell_order['exchange'], '5': sell_order['shares'], '6': sell_order['price']})
    #     db.session.execute('UPDATE balance SET balance = balance + :1 WHERE user_id = :2', {'1': (sell_order['shares'] * sell_order['price']), '2': session.get('id')})
    #     db.session.commit()
    #     return jsonify(200)

    if request.method == 'PATCH':
        db.session.execute('INSERT INTO history (user_id, ticker, action, shares, price) VALUES (:1, :2, :3, :4, :5)', {'1': session.get('id'), '2': sell_order['ticker'], '3': 'sell', '4': sell_order['shares'], '5': sell_order['price']})
        db.session.execute('UPDATE portfolio SET shares = shares - :1, price = :2 WHERE user_id = :3 AND ticker = :4', {'1': sell_order['shares'], '2': sell_order['price'], '3': session.get('id'), '4': sell_order['ticker']})
        db.session.execute('UPDATE balance SET balance = balance + :1 WHERE user_id = :2', {'1': (sell_order['shares'] * sell_order['price']), '2': session.get('id')})
        db.session.commit()
        return jsonify(200)

@app.route('/history', methods=['GET'])
@login_required
def history():
    result_proxy = db.session.execute('SELECT * FROM history WHERE user_id = :1', {'1': session.get('id')})
    response = format_resp(result_proxy)
    return jsonify(response)

@app.route('/compare_auth', methods=['GET'])
@login_required
def compare_auth():
    total_breakdown = db.session.execute('WITH sum AS (SELECT user_id, SUM(position) AS stock FROM portfolio GROUP BY 1) SELECT users.username, balance.balance, sum.stock FROM users INNER JOIN balance ON users.id = balance.user_id INNER JOIN sum ON users.id = sum.user_id')
    total_breakdown = format_resp(total_breakdown)

@app.route('/compare_unauth', methods=['GET'])
def compare_unauth():
    result_proxy = db.session.execute('WITH sum AS (SELECT user_id, SUM(position) AS stock FROM portfolio GROUP BY 1) SELECT users.username, balance.balance, sum.stock FROM users INNER JOIN balance ON users.id = balance.user_id INNER JOIN sum ON users.id = sum.user_id')
    response = format_resp(result_proxy)
    return jsonify(response)

@app.route('/reset', methods=['PATCH'])
# @login_required
def reset():
    session['id'] = 1
    db.session.execute('UPDATE balance SET balance = :1 WHERE user_id = :2', {'1': 10000, '2': session.get('id')})
    db.session.execute('DELETE FROM portfolio WHERE user_id = :1', {'1': session.get('id')})
    db.session.execute('DELETE FROM history WHERE user_id = :1', {'1': session.get('id')})
    db.session.commit()
    return jsonify(200)

@app.route('/denied')
def denied():
    return jsonify("Access Denied")


'''TEST/DEBUG ROUTES'''

@app.route('/check', methods=['GET'])
@login_required
def check():
    resultproxy = db.session.execute('SELECT * FROM users where id = :1', {'1': session.get("id")})
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



app.run(debug=True)

