import React from 'react';

type HelloProps = {
    name: string;
    optional?: string;
    onClick: (name: string) => void;
}

function Hello({name, optional, onClick}: HelloProps) {
    const handleClick = () => onClick(name);

    return(
        <h1>
            Hello! {name} 
            {optional && <p>{optional}</p>}
            <button onClick={handleClick}>클릭!</button>
        </h1>
    )
}

export default Hello;