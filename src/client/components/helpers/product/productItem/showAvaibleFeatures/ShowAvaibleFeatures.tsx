import React from "react";
import styles from './showAvaibleFeatures.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import HoverPopupContainer from "../hoverPopupContainer/HoverPopupContainer";
import AllFeaturesDisplay from "../../features/AllFeaturesDisplay";
import { DefaultVariantCode } from "../../../../../redux/Models/PublicConfig/DefaultVariantCode/DefaultVariantCode.model";

interface ShowAvaibleFeaturesProps {
    active: boolean;
    currentVariationCode: DefaultVariantCode;
    onClickFunction: (featureId: any, obj: any) => void;
}

const ShowAvaibleFeatures: React.FC<ShowAvaibleFeaturesProps> = props => {
    const { active, currentVariationCode, onClickFunction } = props;
    return <HoverPopupContainer active={active}>
        <AllFeaturesDisplay
            currentVariationCode={currentVariationCode}
            allProductVariation={null}
            onlyWishlistFeatures={true}
            displayInline={true}
            isGlobalChange={true}
            onClickFunction={onClickFunction}
            disableOpacity={true}
            
        />
    </HoverPopupContainer>;
}
export default withStyles(styles)(ShowAvaibleFeatures);