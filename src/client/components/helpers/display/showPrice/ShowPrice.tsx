import { FC } from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import styles from './showPrice.scss';
import { useSelector, shallowEqual } from "react-redux";
import { formatPrice, getPriceByCurrency } from "../../../../utils/utilsFrondend";
import { RootState } from "../../../../client";


interface ShowPriceProps {
    allPrices: {
        [key: string]: number
    },
    salePrice: {
        [key: string]: number
    },
    showPromo: boolean,
    quantity: number;
    showQuantity?: boolean;
}

const ShowPrice: FC<ShowPriceProps> = (props) => {
    const { allPrices, salePrice, showPromo,
        showQuantity,
        quantity,
        // showFinalPrice 
    } = props;

    const { currency, allCurrencies } = useSelector((state: RootState) => ({
        currency: state.User.currency,
        allCurrencies: state.SystemConfig.allCurrencies,
    }), shallowEqual);

    const regularPrice = getPriceByCurrency(allPrices, currency, allCurrencies);
    const promoPrice = getPriceByCurrency(salePrice, currency, allCurrencies);

    const finalRegularPrice = regularPrice * quantity;
    const finalPromoPrice = promoPrice * quantity;
    // const finalOemPrice = finalQuantity ? price * finalQuantity : price;
    // const formatedPrice = formatPrice(finalOemPrice, currency, allCurrencies);

    // const promoPrice = showPromo ? getPromoPrice(price, sale, finalQuantity) : 0;

    return <div className={`${styles.price}`}>
        {showQuantity && quantity > 1 ? quantity + ' x ' : ''}
        <div className={showPromo && !showQuantity ? styles.promo : ''}>
            {showPromo ?
                showQuantity ?
                    formatPrice(promoPrice, currency, allCurrencies) :
                    formatPrice(finalPromoPrice, currency, allCurrencies)
                :
                showQuantity ?
                    formatPrice(regularPrice, currency, allCurrencies) :
                    formatPrice(finalRegularPrice, currency, allCurrencies)
            }
        </div>
        {
            showPromo && !showQuantity && <del>{formatPrice(finalRegularPrice.toFixed(2), currency, allCurrencies)}</del>
        }
        {/* {
            !showQuantity ?
                showPromo ?
                    formatPrice(finalPromoPrice, currency, allCurrencies) : 
                    formatPrice(finalRegularPrice, currency, allCurrencies) :
                ''
                // <del>{formatPrice(finalRegularPrice.toFixed(2), currency, allCurrencies)}</del>
        }
        {
            !showQuantity && showPromo && <del>{formatPrice(finalRegularPrice.toFixed(2), currency, allCurrencies)}</del>
        } */}
    </div>
    // return <div className={`${styles.price} ${quantity > 1 ? styles.quantity : ''}`}>
    //     {quantity > 1 ? quantity + ' x ' : ''}


    //     {/* {showPromo ?
    //         <div className={quantity > 1 ? '' : styles.promo}>
    //             {
    //                 formatPrice(promoPrice, currency, allCurrencies)}
    //         </div>
    //     }
    //     {
    //         formatPrice(finalRegularPrice, currency, allCurrencies)
    //     }
    //     {showFinalPrice} */}

    //     {/* {showFinalPrice ? 
    //         showPromo ?
    //             <del>{formatPrice(finalRegularPrice.toFixed(2), currency, allCurrencies)}</del> :
    //             formatPrice(finalRegularPrice, currency, allCurrencies) :
    //     } */}

    // </div>
}

export default withStyles(styles)(ShowPrice);