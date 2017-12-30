import { CoinType } from '../enums/coin-type.enum';
import { CoinsParserService, ErrorMessages, toCanonical } from './coins-parser.service';

describe("coins-parser.service tests.", () => {
    const coinsParser = new CoinsParserService();

    it("toCanonical_validValues_rightCanonicalForms", () => {
        expect(coinsParser.parse('432')).toBe(432);
        expect(coinsParser.parse('213p')).toBe(213);
        expect(coinsParser.parse('125p')).toBe(125);
        expect(coinsParser.parse('£16.23p')).toBe(1623);
        expect(coinsParser.parse('£14')).toBe(1400);
        expect(coinsParser.parse('£54.04')).toBe(5404);
        expect(coinsParser.parse('£23.33333')).toBe(2333);
        expect(coinsParser.parse('001.41p')).toBe(141);
        expect(coinsParser.parse('£54.4')).toBe(5440);
        expect(coinsParser.parse('£54.4p')).toBe(5440);
    });

    it("parse_invalidMoneyString_throwEmptyStringError", () => {
        expect(() => coinsParser.parse('')).toThrowError(ErrorMessages.emptyString);
    });

    it("parse_invalidMoneyString_throwInvalidCharacterError", () => {
        expect(() => coinsParser.parse('13x')).toThrowError(ErrorMessages.invalidCharacter);
    });

    it("parse_invalidMoneyString_throwValidCharacterInWrongPossitionError", () => {
        expect(() => coinsParser.parse('13p.02')).toThrowError(ErrorMessages.validCharacterInWrongPossition);
    });

    it("parse_invalidMoneyString_throwMissingValueError", () => {
        expect(() => coinsParser.parse('£p')).toThrowError(ErrorMessages.missingValue);
    });

    it("getCoins_123p_rightNumberOfCoins", () => {
        const result = coinsParser.getCoins('123p');

        expect(result.length).toBe(4);
        expect(result[0].coin.coinType).toBe(CoinType.OnePound);
        expect(result[0].amount).toBe(1);
        expect(result[1].coin.coinType).toBe(CoinType.TwentyPence);
        expect(result[1].amount).toBe(1);
        expect(result[2].coin.coinType).toBe(CoinType.TwoPence);
        expect(result[2].amount).toBe(1);
        expect(result[3].coin.coinType).toBe(CoinType.OnePenny);
        expect(result[3].amount).toBe(1);
    });

    it("getCoins_213p_rightNumberOfCoins", () => {
        const result = coinsParser.getCoins('413p');

        expect(result.length).toBe(4);
        expect(result[0].coin.coinType).toBe(CoinType.TwoPounds);
        expect(result[0].amount).toBe(2);
        expect(result[1].coin.coinType).toBe(CoinType.TenPence);
        expect(result[1].amount).toBe(1);
        expect(result[2].coin.coinType).toBe(CoinType.TwoPence);
        expect(result[2].amount).toBe(1);
        expect(result[3].coin.coinType).toBe(CoinType.OnePenny);
        expect(result[3].amount).toBe(1);
    });

    it("getCoins_£12.34_rightNumberOfCoins", () => {
        const result = coinsParser.getCoins('£12.34');

        expect(result.length).toBe(4);
        expect(result[0].coin.coinType).toBe(CoinType.TwoPounds);
        expect(result[0].amount).toBe(6);
        expect(result[1].coin.coinType).toBe(CoinType.TwentyPence);
        expect(result[1].amount).toBe(1);
        expect(result[2].coin.coinType).toBe(CoinType.TenPence);
        expect(result[2].amount).toBe(1);
        expect(result[3].coin.coinType).toBe(CoinType.TwoPence);
        expect(result[3].amount).toBe(2);
    });
});