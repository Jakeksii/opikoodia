const ContactCard = (props) => {
    const cardStyle = {
        backgroundColor:"lightgreen",
        height:200,
        with:150,
        margin:"10px",
        textAlign:"center"
    }

    return(
        <div style={cardStyle}>
            {props.children}
        </div>
    )
}

export default ContactCard;