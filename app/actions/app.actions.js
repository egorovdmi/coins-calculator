export const ActionNames = {
    MoneyTextChange: '[App] Money text change',
    Calculete: '[App] Calculate',
    CalculationSuccess: '[App] Calculation success',
    CalculationError: '[App] Calculation error'
};

export class MoneyTextChange {
    type = ActionNames.MoneyTextChange;
    constructor(payload) {
        this.payload = payload;
    }
}

export class Calculete {
    type = ActionNames.Calculete;
    constructor(payload) {
        this.payload = payload;
    }
}

export class CalculationSuccess {
    type = ActionNames.CalculationSuccess;
    constructor(payload) {
        this.payload = payload;
    }
}

export class CalculationError {
    type = ActionNames.CalculationError;
    constructor(payload) {
        this.payload = payload;
    }
}
