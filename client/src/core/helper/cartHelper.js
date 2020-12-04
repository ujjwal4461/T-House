export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    let dup;
    cart.map((product)=>{
      console.log(product._id, item._id)
      if(product._id===item._id){
        console.log("equal")
        dup = 1
      }
    })
    console.log(dup);
    if(dup===1){
      console.log()
      return 1;
    }
    cart.push({
      ...item,
      count: 1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      console.log(cart.length)
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const loadCartLength = () => {
  let cart = []
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    return cart.length;
  }
};

export const removeItemFromCart = productId => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const cartEmpty = next => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    //let cart = [];
    //localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};


