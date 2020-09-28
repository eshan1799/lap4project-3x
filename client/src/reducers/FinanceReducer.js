const initState = {
    username: "",
    cash: 0,
    equity: 0,
    balance: 0,
    portfolio: [],
    history: [],  
    searchResult: {},
    historicPrices: {}
    comparison: {}
}

const FinanceReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOG_IN':
            return { ...state, username: action.payload }
        case 'ADD_PORTFOLIO':
            return { ...state, cash: action.payload.cash, equity: action.payload.equity, balance: (action.payload.cash + action.payload.equity), portfolio: action.payload.portfolio }
        case 'ADD_HISTORY':
            return { ...state, history: action.payload }
        case 'ADD_SEARCH':
            return { ...state, searchResult: action.payload }
        case 'ADD_HISTORIC_PRICES':
            return { ...state, historicPrices: action.payload}
        case 'ADD_COMPARISON':
            return { ...state, comparison: action.payload }
    }
}