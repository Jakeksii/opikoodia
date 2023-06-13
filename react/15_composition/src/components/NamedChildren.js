const NamedChildren = (props) =>{
    const cardStyle = {
        backgroundColor:"lightblue",
        height:200,
        with:150,
        margin:"10px",
        textAlign:"center"
    }
    return (
        <div style={cardStyle}>
            <>{props.header}</>
            {props.media ? <>{props.media}</> : <></>}
            <>{props.content}</>
        </div>
    )
}

export default NamedChildren