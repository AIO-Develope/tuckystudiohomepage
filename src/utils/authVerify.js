import config from '../../config';

export async function verifyToken() {
    const token = getCookie("token");
  
    if (!token) {
      return false;
    }
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
  
    try {
      const response = await fetch(`${config.apiUrl}/auth/verify`, requestOptions);
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  }
  