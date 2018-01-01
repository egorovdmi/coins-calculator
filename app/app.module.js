import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoinsCalculatorAppComponent } from './containers/app/app.component';
import { SterlingCoinComponent } from './components/sterling-coin/sterling-coin.component';
import { MoneyInputComponent } from './components/money-input/money-input.component';
import { CoinsListComponent } from './components/coins-list/coins-list.component';
import { CoinsParserService } from './services/coins-parser.service';

import { reducers } from './reducers';
import { AppEffects } from './effects/app.effects';

@NgModule({
    imports: [
        BrowserModule,
        /**
         * StoreModule.forRoot is imported once in the root module, accepting a reducer
         * function or object map of reducer functions. If passed an object of
         * reducers, combineReducers will be run creating your application
         * meta-reducer. This returns all providers for an @ngrx/store
         * based application.
         */
        StoreModule.forRoot(reducers),
        /**
         * EffectsModule.forRoot() is imported once in the root module and
         * sets up the effects class to be initialized immediately when the
         * application starts.
         *
         * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
         */
        EffectsModule.forRoot([AppEffects]),
        /**
         * Store devtools instrument the store retaining past versions of state
         * and recalculating new states. This enables powerful time-travel
         * debugging.
         *
         * To use the debugger, install the Redux Devtools extension for either
         * Chrome or Firefox
         *
         * See: https://github.com/zalmoxisus/redux-devtools-extension
         */
        StoreDevtoolsModule.instrument()
    ],
    declarations: [
        CoinsCalculatorAppComponent,
        SterlingCoinComponent,
        MoneyInputComponent,
        CoinsListComponent
    ],
    providers: [
        CoinsParserService
    ],
    bootstrap: [
        CoinsCalculatorAppComponent
    ]
})
export class CoinsCalculatorAppModule {
}