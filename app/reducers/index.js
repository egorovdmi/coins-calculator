import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from './app.reducer';

export const reducers = {
    app: fromApp.reducer
};

/**
 * App Selectors
 */
export const getAppState = createFeatureSelector('app');
export const getMoneyText = createSelector(
    getAppState,
    fromApp.getMoneyText
);
export const getErrorMessage = createSelector(
    getAppState,
    fromApp.getErrorMessage
);
export const getCoinsList = createSelector(
    getAppState,
    fromApp.getCoinsList
);