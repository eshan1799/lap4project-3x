const initState = {
    username: '',
    cash: 0,
    equity: 0,
    balance: 0,
    portfolio: [],
    history: [],
    searchResult: {},
    historicPrices: {},
    comparison: {}
}

const FinanceReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_PORTFOLIO':
            return { ...state, cash: action.payload.cash.toFixed(2), equity: action.payload.equity.toFixed(2), balance: (action.payload.cash + action.payload.equity).toFixed(2), portfolio: action.payload.portfolio, username: action.payload.username }
        case 'ADD_HISTORY':
            return { ...state, history: action.payload }
        case 'ADD_SEARCH':
            return { ...state, searchResult: action.payload }
        case 'ADD_HISTORIC_PRICES':
            return { ...state, historicPrices: action.payload }
        case 'ADD_COMPARISON':
            return { ...state, comparison: action.payload }
        case 'CLEAR_SEARCH':
            return { ...state, searchResult: {}}
        case 'LOG_OUT':
            return state = initState
        default:
            return state;
    }
}

export default FinanceReducer;