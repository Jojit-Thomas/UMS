import { Link } from 'react-router-dom'
import styled from "styled-components"

const Anchor = styled(Link)`
  margin: 20px;
`

function Home() {
  return (
    <div>
      <Anchor to="/login">Login</Anchor>
      <Anchor to="/university">University</Anchor>
      <Anchor to="/University/login">University/login</Anchor>
      <Anchor to="/student">student</Anchor>
      <Anchor to="/student/login">student/login</Anchor>
      <Anchor to="/student/register">student/register</Anchor>
      <Anchor to="/teacher">teacher</Anchor>
      <Anchor to="/teacher/register">teacher/register</Anchor>
      <Anchor to="/college">college</Anchor>
      <Anchor to="/college/register">college/register</Anchor>
    </div>
  )
}

export default Home

