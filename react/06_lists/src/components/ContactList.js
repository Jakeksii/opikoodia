const ContactList = (props) => {

    let contacts = props.list.map((contact) => {
        return(
            <tr key={contact.id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td><button onClick={ () => props.removeContact(contact.id)}>Remove</button></td>
            </tr>
        )
    })

    return(
        <table>
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {contacts}
            </tbody>
        </table>
    )
}

export default ContactList;