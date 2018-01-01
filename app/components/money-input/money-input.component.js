import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'money-input',
    templateUrl: 'money-input.component.html',
    styleUrls: ['money-input.component.less']
})
export class MoneyInputComponent {
    @Input('value') value = '';
    @Input('errorMessage') errorMessage = '';
    @Output('valueChange') valueChange = new EventEmitter();
    @Output('complete') complete = new EventEmitter();

    hasError() {
        return this.errorMessage !== undefined || this.errorMessage !== null || this.errorMessage !== '';
    }

    handleValueChange(event) {
        this.valueChange.emit(event.target.value);
    }

    handleKeypress(event) {
        if (event.charCode == 13) {
            event.preventDefault();
            this.complete.emit();
        }
    }
}
