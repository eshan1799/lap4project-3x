const url = 'http://localhost:5000'
import 'regenerator-runtime/runtime'

const addUsername = username => ({
    type: 'ADD_USERNAME',
    payload: username
})

const addPortfolio = portfolio => ({
    type: 'ADD_PORTFOLIO',
    payload: portfolio
})

const addHistory = history => ({
    type: 'ADD_HISTORY',
    payload: history
})

const addSearch = search => ({
    type: 'ADD_SEARCH',
    payload: search
})

const addHistoricPrices = comparison => ({
    type: 'ADD_HISTORIC_PRICES',
    payload: historicPrices
})

const addComparison = comparison => ({
    type: 'ADD_COMPARISON',
    payload: comparison
})

export const registerUser = (details) => {
    try {
        options = {
            headers: { 'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(details)
        }
        fetch(`${url}/register`, options)

    } catch (err) {
        console.warn(err.message)
    }
}

export const logIn = (details) => {
    return async dispatch => {
        try {
            const options = {
                headers: { 'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(details)
            }
            const response = await fetch(`${url}/login`, options)
            const username = response.json()
            dispatch(addUsername(username))
            dispatch(getPortfolio())
            } catch (err) {
                console.warn(err.message)
            
        }
    }
}

export const getPortfolio = () => {
    return async dispatch => {
        try {
            const options = {
            }
            const response = await fetch(`${url}/portfolio`, options)
            const portfolio = await response.json()
            dispatch(addPortfolio(portfolio))
        } catch (err) {
            console.warn(err.message)
        }
    }
}

export const getHistory = () => {
    return async dispatch => {
        try {
            const options = {
            }
            const history = await fetch(`${url}/history`, options)
            dispatch(addHistory(history))
        } catch (err) {
            console.warn(err.message)
        }
    }
}

export const newShare = (order) => {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(order)
        }
    } catch (err) {
        console.warn(err.message)
    }
}

export const updateShares = (order) => {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(order)
        }
    } catch(err) {
        console.warn(err.message)
    }
}

export const sellShare = (order) => {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(order)
        }
        
    } catch(err) {
        console.warn(err.message)
    }

}

export const getSearch = (ticker, token) => {
    return async dispatch => {
        try {
            const searchResult = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${token}`)
            dispatch(addSearch(searchResult))
        } catch (err) {
            console.warn(err.message)
        }
    }
}

export const getHistoricPrices = (ticker, range = '1y', token) => {
    return async dispatch => {
        try {
            const historicPrices = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}?token=${token}`)
            dispatch(addHistoricPrices(historicPrices))
        } catch (err) {
            console.warn(err.message)
        }
    }
}

export const getAuthComparison = () => {
    return async dispatch => {
        try {
            const comparison = await fetch(`${url}/compare_auth`)
            dispatch(addComparison(comparison))
        } catch (err) {
            console.warn(err.message)
        }
    }
}

export const getUnAuthComparison = () => {
    return async dispatch => {
        try {
            const comparison = await fetch(`${url}/compare_unauth`)
            dispatch(addComparison(comparison))
        } catch (err) {
            console.warn(err.message)
        }
    }
}