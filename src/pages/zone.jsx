import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

export default function Zone(){
    var[laws,setlaws]=useState([])
    var {pathvariable}=useParams()
    const navigate=useNavigate()
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        if (!localStorage.getItem("LAWZONE_role")) {
            navigate("/login")
        }else{
            if(pathvariable=="auto"){
                async function zone(){
                    await navigator.geolocation.getCurrentPosition(async function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        await axios.post("https://springboot-law.onrender.com/zone",{lat:latitude,lon:longitude},{
                            auth:{
                                username:localStorage.getItem("LAWZONE_username"),
                                password:localStorage.getItem("LAWZONE_password")
                            }
                        })
                        .then(res=>{setlaws(res.data)
                        alert(res.data)})
                        setLoading(false);
                        
                    
                      });
                    
                }
                 zone()
             
            }else{
                axios.get("https://springboot-law.onrender.com/zone/"+pathvariable,
            {
                auth:{
                    username:localStorage.getItem("LAWZONE_username"),
                    password:localStorage.getItem("LAWZONE_password")
                }
            })
            .then(res=>{setlaws(res.data)
            setLoading(false)})
            
            }
        }
    },[])
function back(){
    navigate("/home")
}
return(
    <div>
        
        <div className=" container-fluid zone_con_1" >
                <Row className="row-h">
                    <Col xs={1} lg={1} className="col-c"><button className="btn btn-primary back" onClick={back}>back</button></Col>
                    <Col xs={11} lg={11} className="col-c"><span className="zone_title">{pathvariable.toString().replaceAll("_"," ").toUpperCase()}</span></Col>
                </Row>
             </div>
             <div className=" container-fluid zone_con_2">
             {loading && <div className="overlay_home">
                <h1>Loading...</h1></div>}
                {laws.map(x=>{
                console.log(x)
            return(
<Row className="row">
<Col lg={8} xs={10} className="law_card" >
<span className="law_id">{x.id}</span>
{/* <span className="law_name">{x.name}</span> */}
<span className="law_dis">{x.description}</span>
</Col>
</Row>

            )
        })}

             </div>
        
    </div>
)
}