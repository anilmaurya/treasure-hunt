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
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 15px;
  border: 1px solid #d8d8d8;
  list-style: none;
  text-align: left;
  font-size: 24px;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #7f7f7f;

  &:last-child {
    border-bottom: none;
  }
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
          <ListItem>
            {winner["name"]}
          </ListItem>
          ))}
        </List>
      </Wrapper>
    </Fragment>
    )
  }
}

export default HallOfFame;
