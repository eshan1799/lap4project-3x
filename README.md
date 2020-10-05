# 3X {Free Exchange}

## Description
3X, the Free Exchange, is a simple trading practice app. 3X allows users to experience the basics of financial investment without putting any of their own capital at risk. Users are able to trade, search for information on stocks of interest and compare their performance to that of other users.

## Instructions
- ## Deployed Version
    - Visit [this link](https://3x.netlify.app/)
- ## Local Version
    - ### First Time Setup Instructions
        - #### Prerequisites
            - [Node.js](https://nodejs.org/en/)
            - [PostgreSQL 12+](https://www.postgresql.org/)
            - [Python 3.8+](https://www.python.org/)
            - [Pip](https://pypi.org/project/pip/) (to install pipenv)
            - [Pipenv](https://pypi.org/project/pip/)
        - Fork and Clone This Repository
        - Create a database in PostgreSQL
        - Seed the database with the contents of `/db/seed.sql`
        - In `/server` create a file called `.env`
        - Inside `.env`:
            - Add `DATABASE_URI = {Your DataBase Local SQLAlchemy URI}` (Check [these docs](https://docs.sqlalchemy.org/en/13/core/engines.html#postgresql) for more info)
            - Add `SECRET = {Any String (This is not suitable practise for production!)}`
            - Add `TOKEN = {IEX Cloud Token}` (Sign up for IEX Cloud Token [here](https://iexcloud.io/))
        - Inside `/server/app.py` near line 23 change `ENV = 'prod'` to `ENV = 'dev'`
        - In the terminal `cd` into `\server` and run `pipenv install -r requirements.txt`
        - In the terminal `cd..` then `cd` into `\client` and run `npm install`
    - ### Regular Running (After first time setup)
        - Open two terminals
        - #### Terminal 1
            - `cd` into `\server`
            - Run `pipenv shell`
            - Run `python app.py`
            - NOTE: When finished, kill server with `CTRL+C` twice and the run `exit` before closing terminal
        - #### Terminal 2
            - `cd` into `\client`
            - Run `npm start`
            - NOTE: When finished, kill server with `CTRL+C` twice before closing terminal
## Known Bugs/ Limitations
- ### All Versions
    - Not yet optimised for mobile
    - #### IEX Cloud API allows for max 50,000 datapoints/month across all exisiting versions of 3X (Dev, Local, Deployed).
        - Loading User Portfolio: 1 Data Point/ Unique Stock in Portfolio
        - Searching Stock to Buy/Trade: 1 Data Point/ Stock Searched
        - Loading News Articles: 10 Data Points/ Stock Searched
        - Loading 30 Day Stock Price History Chart: ~200 Data Points/ Stock Searched
    - When a user buys stock, then sells it all, on their breakdown pie chart an empty legend wil remain with no pie chart allocation attached
        
- ### Deployed Version
    - Heroku server takes 30s to initally start if it hasn't been used for a few hours

## Collaborators
[@albieduffy](https://github.com/albieduffy), [@eshan1799](https://github.com/eshan1799), [@MugishaU](https://github.com/MugishaU)
