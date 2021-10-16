import { useState } from "react";
import "./styles.css";
import axios from "axios";
import UserInfo from '../UserInfo';
import UserList from '../UserList';


function SearchBar(){
    const [ contador, setContador ] = useState(0);
    
    const aumentador = () => setContador(contador + 1);
    const diminuidor = () => setContador(contador - 1);

    const [ username, setUsername ]= useState("")
    const [ users, setUsers ] = useState([]);

    function handleInputChange (event){
        setUsername(event.target.value)
    }
    async function handleSubmit(event){
        event.preventDefault();
        const { data: githubUser } = await axios.get(`https://api.github.com/users/${username}`);
        setUsers([ ...users, githubUser ]);
        setUsername('');
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="form">
                <input 
                type="text" 
                placeholder="Digite seu usuario do github" 
                className="username-input"
                onChange={handleInputChange}
                value={username}
                />
                <button className="search-button">Buscar</button>
            </form>
            <br/>
            <br/>
            {!!(users.length) && (
                <UserList >
                {users.map((user, idx) =>
                <UserInfo key={idx}user={user}/>)}
                </UserList>
           
            )}
            <br/>
            <br/>
            <div>
                <h1>{contador}</h1>
                <div>
                    <button onClick={aumentador}>Aumentar</button>
                    <button onClick={diminuidor}>Diminuir</button>
                </div>
            </div>
        </>
        )

    };

export default SearchBar;