const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  };
  
  const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  };
  
  const updateNewAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  };

  const refreshToken = () => {
    return fetch('http://localhost:5000/refresh', {
        method : 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+getLocalRefreshToken(),   
        }
    }).then(response => {
        if(!response.ok) {
            throw new Error('Failed to refresh token');
        }
        return response.json()
    }).then(data => {
        const newAccessToken = data.accessToken;
        return newAccessToken;
    }).catch(error => {
        throw error;
    })
  }
  
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  const setUser = (user) => {
    //   console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  const removeUser = () => {
    localStorage.removeItem("user");
  };
  
  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateNewAccessToken,
    refreshToken,
    getUser,
    setUser,
    removeUser,
  };
  
  export default TokenService;