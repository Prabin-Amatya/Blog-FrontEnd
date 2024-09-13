const logOutButton = ({setUser}) =>
{
    const handlelogOut = () =>
    {
        window.localStorage.removeItem('loggedInUser')
        setUser(null)
    }

    return(
    <button onClick={handlelogOut}>Log Out</button>
    )
}

export default logOutButton