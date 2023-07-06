import React, { useEffect, useState,useRef } from 'react';
import { BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';



import * as d3 from 'd3';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username,
        password,
      });
      console.log(response.data.message);
      // Redirect to login page after successful signup
      window.location.href = '/login';
    } catch (error) {
      console.log('An error occurred');
    }
  };

  return (<BackgroundContainer>

    <FormContainer>
      <h2>SIGN UP</h2>
      <FormInput
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SubmitButton onClick={handleSignup}>Sign Up</SubmitButton>
    </FormContainer></BackgroundContainer>
  );
}

function LoginForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      setToken(response.data.token);
      // Redirect to home page after successful login
      window.location.href = '/success';
    } catch (error) {
      console.log('Authentication failed');
    }
  };

  return (<BackgroundContainer>
<FormContainer>
      <h2>LOGIN</h2>
      <FormInput
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SubmitButton onClick={handleLogin}>Login</SubmitButton>
    </FormContainer></BackgroundContainer>)}

function Home({ loggedIn }) {
  return (
    <BackgroundContainer>
    <Container>
      {loggedIn ? (
        <WelcomeMessage>Welcome to the Task Management System!</WelcomeMessage>
      ) : (
        <LoginMessage>Please login to access the task management system.</LoginMessage>
      )}
    </Container>
    </BackgroundContainer>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
  height: 100vh;
  
`;

const WelcomeMessage = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: black;
`;

const LoginMessage = styled.p`
  font-size: 18px;
  color: #888888;
`;






function generateBarChart(data) {
  // Set up scales for x and y axes
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([0, 300])
    .padding(0.6);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([150, 0]);

  // Create the SVG element
  const svg = d3.select('#barChart')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500)
    .style('position', 'absolute')
    .style('top', '65%')
    .style('right', '-20%')
    .style('transform', 'translate(-50%, -50%)');
  // Create the main group element and translate it to the appropriate position
  const g = svg.append('g')
    .attr('transform', 'translate(25, 25)');

  // Create the x-axis
  g.append('g')
    .attr('transform', `translate(0, 150)`)
    .call(d3.axisBottom(xScale));

  // Create the y-axis
  g.append('g')
    .call(d3.axisLeft(yScale));

  // Create the bars
  g.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.label))
    .attr('y', d => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', d => 150 - yScale(d.value))
    .attr('fill', 'red')
    .attr('fill', d => d.label === 'Created' ? 'blue' : 'red');
    
    
    
}











//round

function SuccessPage() {
  const chartContainerStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '20px',
  };
  
  const chartRef = useRef(null);
  const dato= [
    { label: 'Created', value: 80 },
    { label: 'Completed', value: 60 },
  ];
  useEffect(() => {
    
    if (chartRef.current) {
      generateBarChart(dato);
      renderRingChart();
    }
  }, []);

  function renderRingChart() {
    const data = [
      { label: '60%', value: 60 },
      { label: '27%', value: 27 },
      { label: '13%', value: 13},
    ];

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    
    d3.select(chartRef.current).html('');

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('position', 'absolute')
      .style('top', '45%')
      .style('left', '13%')
      .style('transform', 'translate(-50%, -50%)')
      function generateBarChart(data) {
        // Set up scales for x and y axes
        const xScale = d3.scaleBand()
          .domain(data.map(d => d.label))
          .range([0, 300])
          .padding(0.6);
      
        const yScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.value)])
          .range([150, 0]);
      
        // Create the SVG element
        const svg = d3.select('#barChart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 500)
          .style('position', 'absolute')
          .style('top', '65%')
          .style('right', '-20%')
          .style('transform', 'translate(-50%, -50%)');
        // Create the main group element and translate it to the appropriate position
        const g = svg.append('g')
          .attr('transform', 'translate(25, 25)');
      
        // Create the bars
        g.selectAll('.bar')
          .data(data)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', d => xScale(d.label))
          .attr('y', d => yScale(d.value))
          .attr('width', xScale.bandwidth())
          .attr('height', d => 150 - yScale(d.value))
          .attr('fill', 'red');
          
      }
      
    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal().range(['green', 'blue','red']);

    const pie = d3.pie().value((d) => d.value);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    const arcs = g
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.label))
      
      
      .attr('stroke-width', 3);

    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '16px')
      
      .style('font-weight','bold')
      .style('fill','white')
      .text((d) => d.data.label);
  }

  return (
    <div><DashboardContainer>
      <h2 style={{fontFamily:'times new roman',fontSize:'40px',textAlign:'center',textDecoration:'underline'}}>Task Completion Dashboard </h2>
      
        <ChartContainer>
        
        <div ref={chartRef}></div>
        
        </ChartContainer>
        <BulletContainer>
          <Bullet1 />
          <BulletText>Transportation</BulletText>
        </BulletContainer>
        <BulletContainer>
          <Bullet2 />
          <BulletText>Processing</BulletText>
        </BulletContainer>
        <BulletContainer>
          <Bullet3 />
          <BulletText>Queue Time</BulletText>
        </BulletContainer>
        
        <ChartContainer2>
        <div id="barChart" ></div>
        </ChartContainer2>
        
        <BulletContainer1>
          <Bullet4 />
          <BulletText>Created </BulletText>

          <Bullet5/>
          <BulletText>Completed</BulletText>
        </BulletContainer1>
        </DashboardContainer>

        
        
    </div>
  );
};


function App() {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);

  return (

    <Router>
      <DashboardContainer>
      <BackgroundContainer>
      <div>
      <nav>
      <Nav>
          <ul>
            <li>
              <StyledLink to="/">
                <StyledButton>Home</StyledButton>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/signup">
                <StyledButton>Sign Up</StyledButton>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/login">
                <StyledButton>Login</StyledButton>
              </StyledLink>
            </li>
          </ul>
        </Nav>
</nav>



        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/login"
            element={<LoginForm setToken={setToken} setLoggedIn={setLoggedIn} />}
          />
          {loggedIn ? (
            <Route path="/success" element={<SuccessPage/>} />
          ) : (
            <Route
              path="/"
              element={() => (
                <Route
                  path="/"
                  element={<LoginForm setToken={setToken} setLoggedIn={setLoggedIn} />}
                />
              )}
            />
          )}
        </Routes>
      </div>
      </BackgroundContainer>
      </DashboardContainer>
    </Router>
  );
  
}
const StyledButton = styled.button`
  background-color: #333333;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  
  &:hover {
    background-color: #555555;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  li {
    margin-right: 10px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FormInput = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #333333;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555555;
  }
`;

const BackgroundContainer = styled.div`
  background-image: url('5137775.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  min-height: 100vh;
`;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ChartContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 40px;

padding: 10px;
  
`;

const BulletContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 450px;
  margin-top: 20px;
  
`;



const Bullet1 = styled.div`
  width: 10px;
  height: 10px;
  background-color: blue; // Replace with the desired chart color
  border-radius: 50%;
  margin-right: 5px;
`;
const Bullet2 = styled.div`
  width: 10px;
  height: 10px;
  background-color: green; // Replace with the desired chart color
  border-radius: 50%;
  margin-right: 5px;
`;
const Bullet3 = styled.div`
  width: 10px;
  height: 10px;
  background-color: red; // Replace with the desired chart color
  border-radius: 50%;
  margin-right: 5px;
`;
const Bullet4 = styled.div`
  width: 10px;
  height: 10px;
  background-color: blue; // Replace with the desired chart color
  border-radius: 50%;
  margin-right: 5px;
`;
const Bullet5 = styled.div`
  width: 10px;
  height: 10px;
  background-color: red; // Replace with the desired chart color
  border-radius: 40%;
  margin-right: 5px;
`;


const BulletText = styled.p`
  margin: 0;
`;

const BulletContainer1 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1200px;
  margin-top: -200px;
  margin-right: 10px;
  
`;

const DashboardContainer = styled.div`
  background-color: #f8f4e6;
  min-height:100vh;

  

`;
const ChartContainer2 = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 40px;

padding: 10px;
  
`;
export default App;
