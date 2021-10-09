import { useState } from "react";
import "./styles.css";
import axios from "axios";


function SearchBar(){
    const [ contador, setContador ] = useState(0);
    
    const aumentador = () => setContador(contador + 1);
    const diminuidor = () => setContador(contador - 1);

    const [ username, setUsername ]= useState("")
    const [ user, setUser ] = useState({});

    function handleInputChange (event){
        setUsername(event.target.value)
    }
    async function handleSubmit(event){
        event.preventDefault();
        const { data: githubUser } = await axios.get(`https://api.github.com/users/${username}`);
        setUser(githubUser);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="form">
                <input 
                type="text" 
                placeholder="Digite seu usuario do github" 
                className="username-input"
                onChange={handleInputChange}
                />
                <button className="search-button">Buscar</button>
            </form>
            <br/>
            <br/>
            {Object.entries(user).length && (
                <>
                    <h1>{user.login}</h1>
                    <span>Followers: {user.followers}</span>
                    <span>Following: {user.following}</span>
                    <img className="profile-pic" src={user.avatar_url} alt="Profile Pic" />
                </>
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