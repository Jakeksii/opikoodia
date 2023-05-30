import { useState } from "react";

const ContactForm = (props) => {

    const [state,setState] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phone:""
    })

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let contact = {
            ...state
        }
        props.addContact(contact);
        setState({
            firstName:"",
            lastName:"",
            email:"",
            phone:""
        })
    }

    return(
        <div style={{
            backgroundColor:"lightgreen",
            width:"40%",
            margin:"auto"
        }}>
            <form onSubmit={onSubmit}>
                <label htmlFor="firstName">First name</label>
                <input type="text"
                    name="firstName"
                    id="firstName"
                    onChange={onChange}
                    value={state.firstName}/>
                <br/>
                <label htmlFor="lastName">Last name</label>
                <input type="text"
                    name="lastName"
                    id="lastName"
                    onChange={onChange}
                    value={state.lastName}/>
                <br/>
                <label htmlFor="email">Email</label>
                <input type="email"
                    name="email"
                    id="email"
                    onChange={onChange}
                    value={state.email}/>
                <br/>
                <label htmlFor="phone">Phone</label>
                <input type="text"
                    name="phone"
                    id="phone"
                    onChange={onChange}
                    value={state.phone}/>
                <br/>
                <input type="submit" value="Add"/>
            </form>
        </div>
    )
}

export default ContactForm;