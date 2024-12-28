import React from "react"
import { Link } from "react-router-dom";
import "../styles/footer.css";
const Footer=()=>{
    const QuickLinks=[
        {
            path:'/home',
            display:'Home'
        },
        {
            path:'/events',
            display:'Events'
        },
        {
            path:'/dashboard',
            display:'DashBoard'
        },
        {
            path:'/about',
            display:'About Us'
        },
    ]
    return <div className="footer_wrapper">
        <div className="footer_container">
        <div className="col-1">
        <div className="Logo">
                <h1>
                    <Link to='/home'>
                    <span>Event<br/>Manager</span>
                    </Link>
                </h1>
        </div>
        <p>Welcome to Event Management portal!<br/>We are dedicated to making your events memorable and successsful.<br/>Our team of proffessionals ensures that every detail is taken care of. </p>
        </div>
        <div className="col-2">
            <h4>Quick Links</h4>
            <div className="quick_links">
                {QuickLinks.map((item,index)=>(
                    <Link className="Quick-links" to={item.path} key={index} >{item.display} </Link>
                ))}
            </div>
        </div>








        <div className="col-3">
                <h4>Head Office</h4>
                <p>xxxxx xx, xxxxxx</p>
                <p>Phone:+91 8688467417</p>
                <p>Email: xyz@gmail.com</p>
                <p>Office Time:10am-7pm</p>
        </div>
        <div className="col-4">
                <h4>NewsLetter</h4>
                <p>Subscribe our newsletter</p>
                <div className="send_mail">
                    <input type="text" placeholder="Email"/>
                    <span><i class="ri-send-plane-fill"></i></span>
                </div>
        </div>
    </div>
    <hr/>
                <div className="footer_bottom">
                
                <p><span><i class="ri-at-line"></i></span>@ copyright 2024, developed by xyz.All rights reserved</p>
                </div>
    </div>
};
export default Footer;