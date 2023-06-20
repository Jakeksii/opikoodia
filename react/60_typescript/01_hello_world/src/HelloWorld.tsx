import React from "react";

interface Props {
    name?:string
    greeting?:string
}

const HelloWorld:React.FC<Props> = (props:Props) => {

        //No need to specify type if we assing value with type
        let name:string = "World";
        let greeting = "Hello";

        name = props.name ? props.name : name
        greeting = props.greeting ? props.greeting : greeting

        return (
            <h2>{greeting} {name}</h2>
        )
}

export default HelloWorld;