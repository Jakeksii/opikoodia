import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

interface Props {
    children:React.ReactNode;
}

const Paragraph = (props:Props):React.JSX.Element => {

    const theme = useContext(ThemeContext);

    const style:React.CSSProperties = {
        ...theme
    }
    return (
        <p style={style}>
            {props.children}
        </p>
    )
}

export default Paragraph;