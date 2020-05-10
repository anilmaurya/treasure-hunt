import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from './components/Layout';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.ul`
width: 760px;
margin-bottom: 20px;
overflow: hidden;
border-top: 1px solid #ccc;
`;

const ListItem = styled.li`
line-height: 1.5em;
border-bottom: 1px solid #ccc;
float: left;
display: inline;
width: 50%;
`;

const StyledLink = styled(Link)`
  width: 100%;
  padding: 15px 15px 15px 0;
  color: #000000;
  text-decoration: none;
  text-align: center;
`;

const defaultPath = process.env.REACT_APP_BASE_PATH;

class HallOfFame extends Component {

  constructor(props) {
    super(props);

    this.state = {
      winners: [],
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_BASE_URL + '/winners')
      .then(response => response.json())
      .then(data => this.setState({ winners: data.result }));
  }
  
  render() {
    const { winners } = this.state;
    return (
      <Fragment>
      <Layout/>
      <Wrapper>
        <h1>Hall of Fame</h1>
        <List>
          {winners.map(winner => (
            <div>
          <ListItem>
            {winner["name"]}
          </ListItem>
          <ListItem>
          {winner["puzzle_name"] || " - "}
          </ListItem>
          </div>
          ))}
        </List>
      </Wrapper>
    </Fragment>
    )
  }
}

export default HallOfFame;
