import { Component, Input } from '@angular/core';

@Component({
    selector: 'coins-list',
    templateUrl: 'coins-list.component.html',
    styleUrls: ['coins-list.component.less']
})
export class CoinsListComponent {
    @Input('coinsWithAmount') coinsWithAmount = [];
}