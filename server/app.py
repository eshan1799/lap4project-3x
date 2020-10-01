from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_session import Session
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from passlib.hash import pbkdf2_sha256 as pw
from flask_sqlalchemy import SQLAlchemy
from helpers import format_resp
from dotenv import load_dotenv
import requests
import os
load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = os.getenv("SECRET")
jwt = JWTManager(app)
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
        return jsonify("Username Taken"),401
    

    resultproxy = db.session.execute('SELECT * FROM users WHERE email = :1', {'1': details['email']})
    response = format_resp(resultproxy)
    if (len(response) == 1):
        return jsonify("Email Already Registered to Account"),401

    hash_pw = pw.hash(details['password'])
    resultproxy = db.session.execute('INSERT INTO users (username,hash,email) VALUES (:1, :2, :3) RETURNING username, id', {'1': details['username'], '2':hash_pw, '3':details['email']})
    response = format_resp(resultproxy)
    db.session.execute('INSERT INTO balance (user_id,balance) VALUES (:1, 10000)',{'1':response[0]['id']})
    db.session.commit()
    resp = {'username': response[0]['username'], 'status': 200}
    
    return jsonify(resp)


@app.route('/login', methods=['POST'])
def login():
    details = request.get_json()
    resultproxy = db.session.execute('SELECT * FROM users WHERE username = :1',{'1': details['username']})
    response = format_resp(resultproxy)

    if len(response) == 0:
        return jsonify('User Does Not Exist'),401
    else:
        if (pw.verify(details['password'], response[0]['hash'])):
            token = create_access_token(identity=response[0]["id"], expires_delta=False)
            
            check_ticker={}
            result_proxy = db.session.execute('SELECT id, ticker FROM portfolio WHERE user_id= :1',{'1':response[0]["id"]})
            stocks = format_resp(result_proxy)
            req_token = os.getenv("TOKEN")
            for stock in stocks:
                if (stock['ticker'] in check_ticker):
                    db.session.execute('UPDATE portfolio SET price = :1 WHERE id = :2', {'1': check_ticker[stock['ticker']] + 1, '2': stock['id']})
                    db.session.commit()
                else:
                    response = requests.get(f"https://cloud.iexapis.com/stable/stock/{stock['ticker']}/quote?token={req_token}")
                    response_dict = response.json()
                    new_price = response_dict['latestPrice']
                    db.session.execute('UPDATE portfolio SET price = :1 WHERE id = :2', {'1': new_price, '2': stock['id']})
                    db.session.commit()
                    check_ticker[stock['ticker']]=new_price
 
            return jsonify(token = token),200
        else:
            return jsonify("Password Incorrect"), 401


@app.route('/portfolio', methods=['GET'])
@jwt_required
def portfolio():
    user_id = get_jwt_identity()
    username = db.session.execute('SELECT username FROM users WHERE id = :1', {'1': user_id})
    username_val = format_resp(username)
    balance = db.session.execute('SELECT balance FROM balance WHERE user_id = :1', {'1': user_id})
    balance_val = format_resp(balance)
    balance_round = round(balance_val[0]['balance'],2)
    equity = db.session.execute('SELECT user_id, SUM(position) AS sum FROM portfolio GROUP BY user_id HAVING user_id = :1', {'1': user_id})
    equity_val = format_resp(equity)
    if len(equity_val) > 0:
        equity_round = round(equity_val[0]['sum'], 2)
        stocks = db.session.execute('SELECT * FROM portfolio WHERE user_id = :1 ORDER BY name',{'1': user_id})
        stock_list = format_resp(stocks)
    else:
        equity_round = 0
        stock_list = []
    portfolio = {'cash': balance_round, 'equity': equity_round,'portfolio': stock_list, 'username':username_val[0]['username']}
    return jsonify(portfolio),200

@app.route('/buy', methods=['POST', 'PATCH'])
@jwt_required
def buy():
    user_id = get_jwt_identity()
    buy_order = request.get_json()
    
    if request.method == 'POST':
        db.session.execute('INSERT INTO history (user_id, ticker, action, shares, price) VALUES (:1, :2, :3, :4, :5)', {'1': user_id, '2': buy_order['ticker'], '3': 'buy', '4': float(buy_order['shares']), '5': buy_order['price']})
        db.session.execute('INSERT INTO portfolio (user_id, ticker, name, exchange, shares, price) VALUES (:1, :2, :3, :4, :5, :6)', {'1': user_id, '2': buy_order['ticker'], '3': buy_order['name'], '4': buy_order['exchange'], '5': float(buy_order['shares']), '6': buy_order['price']})
        db.session.execute('UPDATE balance SET balance = balance - :1 WHERE user_id = :2', {'1': (float(buy_order['shares']) * buy_order['price']), '2': user_id})
        db.session.commit()
        return jsonify ('Transaction Complete: Buy '+buy_order['ticker'])
    
    if request.method == 'PATCH':
        db.session.execute('INSERT INTO history (user_id, ticker, action, shares, price) VALUES (:1, :2, :3, :4, :5)', {'1': user_id, '2': buy_order['ticker'], '3': 'buy', '4': float(buy_order['shares']), '5': buy_order['price']})
        db.session.execute('UPDATE portfolio SET shares = shares + :1,  price = :2 WHERE user_id = :3 AND ticker = :4', {'1': float(buy_order['shares']),'2': buy_order['price'], '3': user_id, '4': buy_order['ticker']})
        db.session.execute('UPDATE balance SET balance = balance - :1 WHERE user_id = :2', {'1': (float(buy_order['shares']) * buy_order['price']), '2': user_id})
        db.session.commit()
        return jsonify('Transaction Complete: Buy '+buy_order['ticker'])

    

@app.route('/sell', methods=['PATCH'])
@jwt_required
def sell():
    user_id = get_jwt_identity()
    sell_order = request.get_json()

    db.session.execute('INSERT INTO history (user_id, ticker, action, shares, price) VALUES (:1, :2, :3, :4, :5)', {'1': user_id, '2': sell_order['ticker'], '3': 'sell', '4': float(sell_order['shares']), '5': sell_order['price']})
    db.session.execute('UPDATE portfolio SET shares = shares - :1, price = :2 WHERE user_id = :3 AND ticker = :4', {'1': float(sell_order['shares']), '2': sell_order['price'], '3': user_id, '4': sell_order['ticker']})
    db.session.execute('UPDATE balance SET balance = balance + :1 WHERE user_id = :2', {'1': (float(sell_order['shares']) * sell_order['price']), '2': user_id})
    db.session.commit()
    return jsonify('Transaction Complete: Sell '+sell_order['ticker'])

@app.route('/history', methods=['GET'])
@jwt_required
def history():
    user_id = get_jwt_identity()
    result_proxy = db.session.execute('SELECT * FROM history WHERE user_id = :1', {'1': user_id})
    response = format_resp(result_proxy)
    return jsonify(response)

@app.route('/compare_auth', methods=['GET'])
@jwt_required
def compare_auth():
    user_id = get_jwt_identity()
    total_breakdown = db.session.execute('WITH sum AS (SELECT user_id, SUM(position) AS stock FROM portfolio GROUP BY 1) SELECT users.id, users.username, balance.balance, sum.stock FROM users INNER JOIN balance ON users.id = balance.user_id INNER JOIN sum ON users.id = sum.user_id WHERE users.id != :1',{'1':user_id})
    total_breakdown = format_resp(total_breakdown)

    for user in total_breakdown:
        portfolio_total = user['balance']+user['stock']
        user['balance'] = user['balance']/portfolio_total
        user['stock'] = user['stock']/portfolio_total
    
    stock_breakdown = db.session.execute('SELECT user_id, ticker, name, exchange, position FROM portfolio WHERE user_id != :1;',{'1':user_id})
    stock_breakdown = format_resp(stock_breakdown)
    stock_grouped = {}
    for stock in stock_breakdown:
        if stock['user_id'] in stock_grouped:
            stock_grouped[stock['user_id']].append(stock)
        else:
            stock_grouped[stock['user_id']]=[stock]

    for user_id in stock_grouped:
        user_list = stock_grouped[user_id]
        stock_total = 0
        for stock in user_list:
            stock_total += stock['position']
        for stock in user_list:
            stock['position'] = stock['position']/stock_total
    
    auth_compare=[]
    for user in total_breakdown:
        total_object = {
            'stock': user['stock'],
            'balance': user['balance']
        }

        compare_object = {
            'id': user['id'],
            'username': user['username'],
            'total_breakdown': total_object,
            'stock_breakdown': stock_grouped[user['id']]
        }

        auth_compare.append(compare_object)

    return jsonify(auth_compare)


@app.route('/compare_unauth', methods=['GET'])
def compare_unauth():
    result_proxy = db.session.execute('WITH sum AS (SELECT user_id, SUM(position) AS stock FROM portfolio GROUP BY 1) SELECT users.username, balance.balance, sum.stock FROM users INNER JOIN balance ON users.id = balance.user_id INNER JOIN sum ON users.id = sum.user_id')
    response = format_resp(result_proxy)
    ratio_list = []
    for user in response:
        balance_ratio = user['balance'] / (user['balance'] + user['stock'])
        stock_ratio = user['stock'] / (user['balance'] + user['stock'])
        user_dict = {'username': user['username'], 'balance':balance_ratio, 'stock':stock_ratio}
        ratio_list.append(user_dict)
    return jsonify(ratio_list)

@app.route('/reset', methods=['PATCH'])
@jwt_required
def reset():
    user_id = get_jwt_identity()
    db.session.execute('UPDATE balance SET balance = :1 WHERE user_id = :2', {'1': 10000, '2': user_id})
    db.session.execute('DELETE FROM portfolio WHERE user_id = :1', {'1': user_id})
    db.session.execute('DELETE FROM history WHERE user_id = :1', {'1': user_id})
    db.session.commit()
    return jsonify('Account Reset')


app.run(debug=True)
