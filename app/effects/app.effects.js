import { Inject, Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { CoinsParserService } from '../services/coins-parser.service';
import * as appActions from '../actions/app.actions';

@Injectable()
export class AppEffects {

    @Effect()
    calculate$ = null;

    constructor(actions$, coinsParserService) {
        this.actions$ = actions$;
        this.coinsParserService = coinsParserService;

        this.calculate$ = this.actions$
        .ofType(appActions.ActionNames.Calculete)
        .map((action) => {
            try {
                const result = this.coinsParserService.getCoins(action.payload.replace(/ /g,''));
                return new appActions.CalculationSuccess(result);
            } catch (err) {
                return new appActions.CalculationError(err.message);
            }
        });
    }
}
AppEffects.parameters = [
    [new Inject(Actions)],
    [new Inject(CoinsParserService)]
];