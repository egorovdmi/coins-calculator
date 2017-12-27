import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoinsCalculatorAppComponent } from './containers/app/app.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        CoinsCalculatorAppComponent
    ],
    providers: [
    ],
    bootstrap: [
        CoinsCalculatorAppComponent
    ]
})
export class CoinsCalculatorAppModule {
}