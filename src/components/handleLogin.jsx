import loginService from '../services/login'
import LoginForm from './LoginForm'
import Toggalable from './Toggalable'

const loginFrom = ({userName, password, blogService, setUser, setUserName, setPassword, setMessage}) =>{

    const handleLogin = async (event) =>{
        event.preventDefault()
        try
        {
          const user = await loginService.login({userName, password})
          window.localStorage.setItem('loggedInUser', JSON.stringify(user))
          blogService.setToken(user.token)
          setUser(user)
          setUserName('')
          setPassword('')
        }
    
        catch(exception){
          console.log(exception)
          setMessage('Wrong Credentials')
          setTimeout(()=>{
            setMessage(null)
          }, 3000)  
        }
      }

    return(
      <Toggalable buttonLabel="Log In">
          <LoginForm
            handleLogin={handleLogin}
            setUserName={setUserName}
            userName={userName}
            password= {password}
            setPassword = {setPassword}
          />
      </Toggalable>
    )
  }

export default loginFrom
