import 'core-js/client/shim';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';

// Importing RxJs operators at once in orderder to not import them in each file
// where we need to use them.
import './utils/rxjs-operators';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CoinsCalculatorAppModule } from './app.module';
import { enableProdMode } from '@angular/core';

enableProdMode();

document.addEventListener('DOMContentLoaded', function bootstrap() {
    platformBrowserDynamic().bootstrapModule(CoinsCalculatorAppModule);

    document.removeEventListener('DOMContentLoaded', bootstrap, false);
}, false);