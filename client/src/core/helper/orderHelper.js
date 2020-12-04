import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: orderData })
  })
    .then(reponse => {
      return reponse.json();
    })
    .catch(err => console.log(err));
};

export const getOrder = (userId,token)=>{
  return fetch(`${API}/order/all/${userId}`,{
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  }).then(res=>{
    console.log(res)
    return res.json()
  }).catch(err=>{
    console.log(err)
  })
}