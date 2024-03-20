import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup(){

    var username=useRef("")
    var password=useRef("")
    const navigate=useNavigate()
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if (localStorage.getItem("LAWZONE_role")) {
            navigate("/lawzone/home")
        }
    },[])
    const fetchData = async () => {
        try {
          const response = await axios.post(
            'https://springboot-law.onrender.com/signup',
            {
                name: username.current,
                password: password.current
             
            }
          );
          alert(response.data)
          if(response.data=="user signed up"){
            navigate('/lawzone/login')
          }else{
            setLoading(false);
          }
          
        } catch (error) {
          alert(error)
        }
      };
    
      // Function to handle button click and trigger data fetching
      const login = (event) => {
        fetchData();
        event.preventDefault();
        setLoading(true);
      };
   
    return (
        
        <Container className='login_con'>
            <Row className='input_row'>
                <Col className='login_col'><h1>WELCOME TO LAWZONE</h1></Col>
            </Row>
            <Row className='input_row'>
                <Col xs={10} lg={5}><label className='login_label'>USERNAME</label></Col>
                <Col xs={10} lg={5}><input className='login_input' type="text" onChange={x=>{username.current=x.target.value}} /></Col>
            </Row>
            <Row className='input_row'>
                <Col xs={10} lg={5}><label className='login_label'>PASSWORD</label></Col>
                <Col xs={10} lg={5}><input  className='login_input'type="text" onChange={x=>{password.current=x.target.value}} /></Col>
            </Row>
            <Row className='input_row'>
                <Col xs={10} lg={5}><button className='login_btn btn btn-primary' onClick={login}>SIGNUP</button></Col>
            </Row>
            <Row className='input_row'>
                <Col className='login_col'><Link to={"/lawzone/login"}>already have an account</Link></Col>
            </Row>
            {loading && <div className="overlay"></div>}
        </Container>
    )
}