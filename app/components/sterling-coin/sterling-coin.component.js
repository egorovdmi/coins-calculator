import { Component, Input } from '@angular/core';

@Component({
    selector: 'sterling-coin',
    templateUrl: 'sterling-coin.component.html',
    styleUrls: ['sterling-coin.component.less']
})
export class SterlingCoinComponent {
    @Input('model') model = null;

    getCoinImage() {
        return `/resources/images/${this.model.value}_p.png`;
    }
}