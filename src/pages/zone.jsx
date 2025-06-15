import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import Notification from './notification.jsx';
export default function Zone(){
    var[laws,setlaws]=useState([])
    var {pathvariable}=useParams()
    var[head,sethead]=useState(pathvariable)
    const navigate=useNavigate()
    const [loading, setLoading] = useState(true);
    const [showNotification, setShowNotification] = useState(false);

    const handleNotificationClose = () => {
      setShowNotification(false);
    };
  
    useEffect(()=>{
        if (!localStorage.getItem("LAWZONE_role")) {
            navigate("/lawzone/login")
        }else{
            if(pathvariable=="auto"){
                async function zone(){
                    await navigator.geolocation.getCurrentPosition(async function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        await axios.post("http://localhost:8080/zone",{lat:latitude,lon:longitude},{
                            auth:{
                                username:localStorage.getItem("LAWZONE_username"),
                                password:localStorage.getItem("LAWZONE_password")
                            }
                        })
                        .then(res=>{setlaws(res.data)
                        if(res.data.length>0){
                            var da=res.data
                            sethead(da[0].zone.toString().replaceAll("_"," ").toUpperCase())
                            setShowNotification(true)
                        }else{
                            sethead("unfound zone")
                        }
                        })
                        setLoading(false);
                        
                    
                      });
                    
                }
                 zone()
             
            }else{
                axios.get("http://localhost:8080/zone/"+pathvariable,
            {
                auth:{
                    username:localStorage.getItem("LAWZONE_username"),
                    password:localStorage.getItem("LAWZONE_password")
                }
            })
            .then(res=>{setlaws(res.data)
            setLoading(false)
            setShowNotification(true)})
           
            
            }
        }
    },[])
function back(){
    navigate("/lawzone/home")
}
return(
    <div>
        
        <div className=" container-fluid zone_con_1" >
                <Row className="row-h">
                    <Col xs={1} lg={1} className="col-c"><button className="btn btn-primary back" onClick={back}>back</button></Col>
                    <Col xs={11} lg={11} className="col-c"><span className="zone_title">{head.toString().replaceAll("_"," ").toUpperCase()}</span></Col>
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
         {showNotification && (
        <Notification
          message="Here, the laws mentioned above are not accurate!"
          onClose={handleNotificationClose}
        />
      )}

             </div>
        
    </div>
)
}