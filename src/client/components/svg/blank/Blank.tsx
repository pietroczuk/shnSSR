import { FC } from "react";

interface Props {
    width: number;
    height: number;
}

const Blank: FC<Props> = ({ width, height }) => {
    const viewBoxWidth = width ? width : 300;
    const viewBoxHeight = height ? height : 300;

    return <svg style={{ width: '100%', height: '100%' }} viewBox={"0 0 " + viewBoxWidth + " " + viewBoxHeight}></svg>;
}
export default Blank;