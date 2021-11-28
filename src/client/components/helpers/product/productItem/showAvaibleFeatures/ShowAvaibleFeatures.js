import React from "react";
import styles from './showAvaibleFeatures.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import HoverPopupContainer from "../hoverPopupContainer/HoverPopupContainer";
import AllFeaturesDisplay from "../../features/AllFeaturesDisplay";

const ShowAvaibleFeatures = props => {
    const { active, currentVariationCode, onClickFunction } = props;
    return <HoverPopupContainer active={active}>
        <AllFeaturesDisplay
            currentVariationCode={currentVariationCode}
            allProductVariation={null}
            wishlistAvaible={true}
            displayInline={true}
            // globalChange={true}
            onClickFunction={onClickFunction}
            disableOpacity={true}
        />
    </HoverPopupContainer>;
}
export default withStyles(styles)(ShowAvaibleFeatures);