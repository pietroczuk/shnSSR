import { FC } from "react";
import styles from './reviews.scss';
import withStyles from "isomorphic-style-loader/withStyles";
import ReviewBar from "./reviewBar/ReviewBar";
import StarFull from "../../svg/icons/StarFull";
import { useSelector } from "react-redux";
import { RootState } from "../../../client";

const Reviews: FC = () => {
    const color = useSelector((state: RootState) => {
        const features = state.PublicConfig.features;
        const allFeatures = features ? Object.entries(state.PublicConfig.features) : null;
        const featureId = allFeatures ? allFeatures[0][0] : null;
        const attribId = featureId ? state.PublicConfig.defaultVariantCode[featureId].atribId : null;
        const color = attribId ? state.PublicConfig.features[featureId].atributes[attribId].color : null;
        return color;
    })
    // rose #f6d9d5
    return <div className={styles.container}>
        <div className={styles.basic}>
            <div className={styles.points}>4.9</div>
            <div className={styles.stars}>
                <StarFull fill={color} />
                <StarFull fill={color} />
                <StarFull fill={color} />
                <StarFull fill={color} />
                <StarFull fill={color} />
            </div>
            <div className={styles.label}>Fantastyczny</div>
        </div>
        <div className={styles.advanced}>
            <ReviewBar number={5} percent={50} color={color} />
            <ReviewBar number={4} percent={40} color={color} />
            <ReviewBar number={3} percent={30} color={color} />
            <ReviewBar number={2} percent={20} color={color} />
            <ReviewBar number={1} percent={10} color={color} />
        </div>
    </div>
}
export default withStyles(styles)(Reviews);
