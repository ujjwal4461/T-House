import React,{useState,useEffect} from 'react'
import Base from './Base'
import { loadCart, removeItemFromCart, loadCartLength } from './helper/cartHelper'
import ImageHelper from './helper/ImageHelper'
import Payment from './Payment'

function Cart() {

    const [cartItem, setCartItem] = useState([])
    const [reload,setReload] = useState(false)

    useEffect(() => {
        setCartItem(loadCart());
    }, [reload])

    return (
        <Base title='My Cart'>
            <div className="row">
                <div className="col l8 m8 s12">
                    {cartItem && cartItem.length> 0 ? cartItem.map((item,index)=>{
                        return (
                            <React.Fragment>
                                <div class="card horizontal" key={index}>
                                    <div class="card-image">
                                        <ImageHelper product={item}></ImageHelper>
                                    </div>
                                    <div class="card-stacked">
                                    <div class="card-content">
                                        <p><b>{item.name}</b></p>
                                        <p><b className="teal-text">Price: </b> {item.price}</p>
                                        <p><b className="teal-text">Stock: </b> {item.stock}</p>
                                    </div>
                                    <div class="card-action">
                                        <button className="btn-flat" style={{width: 100+'%',backgroundColor: "#BFD8D2"}}
                                        onClick={e => {
                                            removeItemFromCart(item._id)
                                            setReload(!reload)
                                        }}>Remove From Cart</button>
                                    </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }):(<h4>Cart Empty</h4>)
                    }
                </div>
                <div className="col l4 m4 s12">
                    checkout:=
                    {cartItem && <Payment products={cartItem} setReload={setReload}/>}
                </div>
            </div>
        </Base>
    )
}

export default Cart
