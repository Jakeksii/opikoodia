import { useState } from 'react';

const useCount = (initialState = 0):[number, () => void, () => void] => {
    const [value, setValue] = useState(initialState);

    const add = ():void => {
        setValue((value) => value+1);
    }

    const substract = ():void => {
        setValue((value) => value -1);
    }

    return [value, add, substract];
}

export default useCount