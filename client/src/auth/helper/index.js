import { API } from '../../backend';

export const signup = (user)=>{
    return fetch(`${API}/auth/signup`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then((res)=>{
        console.log(res)
        return res.json();
    }).catch((err)=>{
        console.log(err);
    })
}

export const signin = (user)=>{
    return fetch(`${API}/auth/signin`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}

export const authenticate = (data,next)=>{
    if(typeof window !== undefined){
        localStorage.setItem('jwt',JSON.stringify(data))
    }
    next();
}

export const isAuthenticate = ()=>{
    console.log(localStorage.getItem('jwt'))
    if(typeof window === undefined){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false
    }
}

export const signout = ()=>{
    if(typeof window !== undefined){
        localStorage.removeItem('jwt')
    }
    return fetch(`${API}/auth/signout`,{
        method: "GET",
    }).then((res)=>{
        console.log("signout sucess")
        return res.json();
    }).catch((err)=>{
        console.log(err)
    })
}