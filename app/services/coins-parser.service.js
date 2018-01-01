import { Injectable } from '@angular/core';
import { CoinType } from '../enums/coin-type.enum';
import { CoinFactory } from '../utils/coin.factory';

/**
 * The array of coins that can be easily extended with extra values.
 * For example, if a new coin type has emmited. 
 */
const sterlingCoinsOrderedByValue = [
    CoinFactory.create(CoinType.TwoPounds),
    CoinFactory.create(CoinType.OnePound),
    CoinFactory.create(CoinType.FiftyPence),
    CoinFactory.create(CoinType.TwentyPence),
    CoinFactory.create(CoinType.TenPence),
    CoinFactory.create(CoinType.FivePence),
    CoinFactory.create(CoinType.TwoPence),
    CoinFactory.create(CoinType.OnePenny)
];

const poundSign = '£';
const pennySign = 'p';
const delimiterSign = '.';
const numbers = '0123456789';
const numbersDictionary = {};
for(let i = 0; i < numbers.length; i++) {
    numbersDictionary[numbers[i]] = numbers[i];
}

/**
 * Valid symbols dictionary.
 */
const validSymbols = {};
validSymbols[poundSign] = poundSign;
validSymbols[pennySign] = pennySign;
validSymbols[delimiterSign] = delimiterSign;
for(let i = 0; i < numbers.length; i++) {
    validSymbols[numbers[i]] = numbers[i];
}

const State = {
    Default: 0,    // £ => ParsingPounds | . => ParsingPence | [0-9] => ParsingPoundsOrPence
    ParsingPoundsOrPence: 1,  // [0-9] => ParsingPoundsOrPence | . => ParsingPence | p => Complete
    ParsingPounds: 2, // [0-9] => ParsingPounds | . => ParsingPence | p => missingValue Error | any other valid character => validCharacterInWrongPossition Error
    ParsingPence: 3,    // [0-9] => ParsingPence | p => Complete | any valid character => validCharacterInWrongPossition Error
    Complete: 4    // any valid character => validCharacterInWrongPossition Error
};

/**
 * State handlers table.
 */
const stateHandlers = {
    [State.Default]: defaultStateHandler,
    [State.ParsingPoundsOrPence]: parsingPoundsOrPenceStateHandler,
    [State.ParsingPounds]: parsingPoundsStateHandler,
    [State.ParsingPence]: parsingPenceStateHandler,
    [State.Complete]: completeStateHandler
}

/**
 * Throws an exception if symbol is invalid.
 * @param {char} symbol 
 */
function checkValidSymbol(symbol) {
    if (validSymbols[symbol] === undefined) {
        throw new Error(ErrorMessages.invalidCharacter);
    }
}

@Injectable()
export class CoinsParserService {
    /**
     * Parses moneyString to the canonical integer representation.
     * For example, 432 => 432, 213p => 213, £16.23p => 1623, £14 => 1400,
     * £54.04 => 5404, £23.33333 => 2333, 001.41p => 141
     * @param {string} moneyString
     */
    parse(moneyString) {
        if (!moneyString) {
            throw new Error(ErrorMessages.emptyString);
        }
        
        let currentState = State.Default;
        let position = 0;

        let value = moneyString.split('').reduce((acc, current) => {
            const currentStateHandler = stateHandlers[currentState];
            const handlerResult = currentStateHandler(current, position);
            if (handlerResult.nextState != currentState) {
                currentState = handlerResult.nextState;
                // reset position after every state change
                position = 0;
            } else {
                position++;
            }
            return acc + handlerResult.value;
        }, '');

        // special case for parsing pounds only
        if (currentState != State.Complete) {
            const currentStateHandler = stateHandlers[currentState];
            // empty string means 'end of stirng'
            value += currentStateHandler('', position).value;
        }

        return parseInt(value);
    }

    /**
     * Returns an array of coins with amount of each coin.
     * @param {string} moneyString 
     */
    getCoins(moneyString) 
    {
        const result = [];
        let currentRemainder = this.parse(moneyString);
        for (let i = 0; i < sterlingCoinsOrderedByValue.length; i++) {
            const coin = sterlingCoinsOrderedByValue[i];
            const amount = Math.floor(currentRemainder / coin.value);
            if (amount == 0)
                continue;

            result.push({ coin, amount });
            currentRemainder = currentRemainder % coin.value;
            if (currentRemainder === 0)
                break;
        }

        return result;
    }
};

function defaultStateHandler(symbol) {
    checkValidSymbol(symbol);

    if (symbol === poundSign) {
        return new StateHandlerResult('', State.ParsingPounds);
    } else if (symbol === delimiterSign) {
        return new StateHandlerResult('', State.ParsingPence);
    } else if (numbersDictionary[symbol]) {
        return new StateHandlerResult(symbol, State.ParsingPoundsOrPence);
    }

    throw new Error(ErrorMessages.validCharacterInWrongPossition);
};

function parsingPoundsOrPenceStateHandler(symbol, position) {
    if (symbol === '') {
        return new StateHandlerResult('', State.Complete);
    }

    checkValidSymbol(symbol);
    
    if (numbersDictionary[symbol]) {
        return new StateHandlerResult(symbol, State.ParsingPoundsOrPence);
    } else if (symbol === delimiterSign) {
        return new StateHandlerResult('', State.ParsingPence);
    } else if (symbol === pennySign) {
        return new StateHandlerResult('', State.Complete);
    } 

    throw new Error(ErrorMessages.validCharacterInWrongPossition);
};

function parsingPoundsStateHandler(symbol, position) {
    if (position > 0 && symbol === '') {
        return new StateHandlerResult('00', State.Complete);
    } else if (position == 0 && symbol === '') {
        throw new Error(ErrorMessages.missingValue);
    }

    checkValidSymbol(symbol);

    if (numbersDictionary[symbol]) {
        return new StateHandlerResult(symbol, State.ParsingPounds);
    } else if (symbol === delimiterSign) {
        return new StateHandlerResult('', State.ParsingPence);
    } else if (symbol === pennySign && position === 0) {
        throw new Error(ErrorMessages.missingValue);
    }

    throw new Error(ErrorMessages.validCharacterInWrongPossition);
};

function parsingPenceStateHandler(symbol, position) {
    const getRestSymbols = (position) => {
        return position === 0 
        ? '00'
        : position === 1
        ? '0'
        : '';
    };

    if (symbol === '') {
        return new StateHandlerResult(getRestSymbols(position), State.Complete);
    }

    checkValidSymbol(symbol);

    if (numbersDictionary[symbol]) {
        return new StateHandlerResult(position > 1 ? '' : symbol, State.ParsingPence);
    } else if (symbol === pennySign) {
        return new StateHandlerResult(getRestSymbols(position), State.Complete);
    }

    throw new Error(ErrorMessages.validCharacterInWrongPossition);
};

function completeStateHandler(symbol) {
    checkValidSymbol(symbol);
    throw new Error(ErrorMessages.validCharacterInWrongPossition);
};

class StateHandlerResult {
    constructor(value, nextState) {
        this.value = value;
        this.nextState = nextState;
    }
}

export const ErrorMessages = {
    invalidCharacter: 'Invalid character.',
    validCharacterInWrongPossition: 'Valid character in the wrong position.',
    missingValue: 'Missing value.',
    emptyString: 'Input string can\'t be empty.'
};
