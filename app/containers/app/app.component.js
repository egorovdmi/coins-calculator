import { Component, Inject, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../actions/app.actions';
import * as appSelectors from '../../reducers';

@Component({
    selector: 'coins-calculator-app',
    templateUrl: 'app.component.html'
})
export class CoinsCalculatorAppComponent {
    constructor(store) {
        this.store = store;
    }

    calculate() {
        this.store.select(appSelectors.getMoneyText)
            .take(1)
            .subscribe((moneyText) => {
                this.store.dispatch(new fromApp.Calculete(moneyText));
            });
    }

    moneyTextChange(text) {
        this.store.dispatch(new fromApp.MoneyTextChange(text));
    }

    ngOnInit() {
        this.errorMessage$ = this.store.select(appSelectors.getErrorMessage);
        this.moneyText$ = this.store.select(appSelectors.getMoneyText);
        this.coinsList$ = this.store.select(appSelectors.getCoinsList);
    }
}
CoinsCalculatorAppComponent.parameters = [[new Inject(Store)]];