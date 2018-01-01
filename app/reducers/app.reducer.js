import * as appActions from '../actions/app.actions';

const initialState = {
    moneyText: '',
    errorMessage: '',
    coinsList: []
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case appActions.ActionNames.MoneyTextChange:
        case appActions.ActionNames.Calculete:
            return {
                moneyText: action.payload,
                errorMessage: '',
                coinsList: []
            };
        case appActions.ActionNames.CalculationSuccess:
            return {
                ...state,
                coinsList: action.payload
            };
        case appActions.ActionNames.CalculationError:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export const getErrorMessage = (state) => state.errorMessage;
export const getCoinsList = (state) => state.coinsList;
export const getMoneyText = (state) => state.moneyText;