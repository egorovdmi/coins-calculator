import { CoinType } from '../enums/coin-type.enum';
import { Coin } from '../models/coin.model';

export const UnknownCoinTypeErrorMessage = 'Unknown coin type.';

export class CoinFactory {
    static create(coinType) {
        switch (coinType) {
            case CoinType.TwoPounds:
                return new Coin('£2', 200, CoinType.TwoPounds);
            case CoinType.OnePound:
                return new Coin('£1', 100, CoinType.OnePound);
            case CoinType.FiftyPence:
                return new Coin('50p', 50, CoinType.FiftyPence);
            case CoinType.TwentyPence:
                return new Coin('20p', 20, CoinType.TwentyPence);
            case CoinType.TenPence:
                return new Coin('10p', 10, CoinType.TenPence);
            case CoinType.FivePence:
                return new Coin('5p', 5, CoinType.FivePence);
            case CoinType.TwoPence:
                return new Coin('2p', 2, CoinType.TwoPence);
            case CoinType.OnePenny:
                return new Coin('1p', 1, CoinType.OnePenny);
            default:
                throw new Error(UnknownCoinTypeErrorMessage);
        }
    }
};