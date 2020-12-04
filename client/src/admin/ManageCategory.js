import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { getAllCategories } from './helper/adminapicalls'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function ManageCategory() {

    const [categories, setCategories] = useState([]);

    const preload = () => {
        getAllCategories()
        .then(data=>{
            console.log(data.categories)
            if(data.error){
                console.log(data.error)
            }
            else{
                setCategories(previousState => (data.categories))
            }
        })
    }

    useEffect(() => {
        preload();
    
    }, [ ])

    const goBack = () => (
        <div>
          <Link className="btn-flat grey-text wave-effect" to="/admin/dashboard">
            Admin Home
          </Link>
        </div>
      );

    const ManageCategory= ()=>{
        return(
            <React.Fragment>
                <ul className="collection with-header">
                <li class="collection-header teal-text"><h4>Categories:= </h4></li>
                {categories!== undefined && categories.map((category,index)=>{
                    return (
                        <li 
                        className="collection-item teal-text" key={index}>
                        <div>* {category.name}
                        <Link to="" className="secondary-content"><span className="btn-small wave-effect">Delete</span></Link>
                        <Link to="" className="secondary-content"><span className="btn-small wave-effect">Update</span></Link>
                        </div>
                        </li>
                    )
                })}
                </ul>
            </React.Fragment>
        )
    }

    return (
        <div>
            <Base title="Manage All The Categories"
            description="">
                 {ManageCategory()}
                 {goBack()}
            </Base>
        </div>
    )
}

