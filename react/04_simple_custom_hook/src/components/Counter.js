import useCount from "../hooks/UseCount";

const Counter = (props) => {
    let count = 10;
    if(props.count){
        count = props.count
    }

    const [value,add,substact] = useCount(count)

    return <div>
        <h4>Count: {value}</h4>
        <button onClick={add}>+</button>
        <button onClick={substact}>-</button>
    </div>
}

export default Counter