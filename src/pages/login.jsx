import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(){
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
          const response = await axios.get(
            'https://springboot-law.onrender.com/login',
            {
              auth: {
                username: username.current,
                password: password.current
              }
            }
          );
          localStorage.setItem("LAWZONE_username",username.current)
          localStorage.setItem("LAWZONE_password",password.current)
          localStorage.setItem("LAWZONE_role",response.data)
          alert("login success")
          navigate('/lawzone/home')

        } catch (error) {
          alert("no user")
          setLoading(false);
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
                <Col xs={10} lg={5}><input  className='login_input'type="text" onChange={x=>{password.current=x.target.value}}/></Col>
            </Row>
            <Row className='input_row'>
                <Col xs={10} lg={5}><button className='login_btn btn btn-primary' onClick={login}>LOGIN</button></Col>
            </Row>
            <Row className='input_row'>
                <Col className='login_col'><Link to={"/lawzone/signup"}>create an account</Link></Col>
            </Row>
            {loading && <div className="overlay"></div>}
        </Container>

    )
}