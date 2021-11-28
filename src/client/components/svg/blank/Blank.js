import React from "react";
const Blank = ({ width, height }) => {
    const viewBoxWidth = width ? width : 300;
    const viewBoxHeight = height ? height : 300;
 
    return <svg style={{width: '100%', height: '100%'}} viewBox={"0 0 "+viewBoxWidth+" "+viewBoxHeight}></svg>;
}
export default Blank;