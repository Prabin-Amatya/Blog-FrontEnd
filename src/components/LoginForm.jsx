const LoginForm = ({handleLogin, setUserName, userName, password, setPassword}) =>{
    return(
        <div>
          <form onSubmit={handleLogin}>
            <div>
              <label>UserName:</label>
              <input onChange = {({target}) => setUserName(target.value)}
                    name = "userName"
                    value = {userName}/>
            </div>

            <div>
              <label>Password:</label>
              <input onChange = {({target}) => setPassword(target.value)}
                    name = "password"
                    value = {password}/>
            </div>

            <input type="submit" value="Log In"/>
          </form>
        </div>
    )
}

export default LoginForm