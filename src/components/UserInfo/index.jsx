import './styles.css'

export default function UserInfo(props){
  return(
    <div>
      <h1>{props.user.login}</h1>
      <span>Followers: {props.user.followers}</span>
      <span>Following: {props.user.following}</span>
      <img className="profile-pic" src={props.user.avatar_url} alt="Profile Pic" />

    </div>
    
  )
}
