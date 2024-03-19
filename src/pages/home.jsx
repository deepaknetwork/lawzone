import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Home(){
    var[data,setdata]=useState([])
    const navigate=useNavigate()
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        if (!localStorage.getItem("LAWZONE_role")) {
            navigate("/login")
        }else{
            axios.get("https://springboot-law.onrender.com/zone",
            {auth:{
                username:localStorage.getItem("LAWZONE_username"),
                password:localStorage.getItem("LAWZONE_password")
            }})
            .then((res)=>{
                setdata(res.data)
                setLoading(false);
            })
        }
    },[])

    function logout(){
        localStorage.removeItem("LAWZONE_username")
        localStorage.removeItem("LAWZONE_password")
        localStorage.removeItem("LAWZONE_role")
        navigate("/login")
    }
    function bt(){
        navigate("/zone/auto")
    }
    return(
        <div className="zone_page">
             <div className=" container-fluid zone_con_1" >
                <Row className="row-h">
                    <Col xs={12} lg={11} className="col-c"><span className="home_title">LAW ZONE</span></Col>
                    <Col xs={12} lg={1} className="col-c"><button className="btn btn-primary" onClick={logout}>logout</button></Col>
                </Row>
             </div>

             <div className=" container-fluid zone_con_2">
             {loading && <div className="overlay_home">
                <h1>Loading...</h1></div>}
            <Row className="row">
                <Col lg={8} xs={10} className="zone_card" onClick={bt}>
                <span className="zone_text" >FIND BY ZONE</span>
                </Col>
            </Row>
                
            
            {data.map(x=>{
                function btt(){
                    navigate("/zone/"+x)
                }
                return(
                    <Row className="row">
                    <Col  lg={8} xs={10} className="zone_card" onClick={btt}>
                    <span className="zone_text">{x.toString().toUpperCase().replaceAll("_"," ")}</span>    
                    </Col>
                </Row>
                    
                )
            })}
             </div>
            
        </div>
    )
}