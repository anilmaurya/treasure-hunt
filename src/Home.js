import React, { Component } from 'react'
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
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #7f7f7f;
  cursor: pointer;

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



class Home extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        puzzles: [],
      };
    }

    componentDidMount() {
      fetch(process.env.REACT_APP_API_BASE_URL + '/puzzles')
        .then(response => response.json())
        .then(data => this.setState({ puzzles: data.result }));
    }

    render() {
      return (
        <div>
          <Layout/>
          <Wrapper>
            
            <h1>Active Treasure Hunt</h1>
            <List>
            {this.state.puzzles.map(puzzle => (
              <ListItem>
                <StyledLink to={`${defaultPath}puzzle/${puzzle}`}>Puzzle {puzzle}</StyledLink>
              </ListItem>
            ))}
            </List>
          </Wrapper>
        </div>
      )
    }
}

export default Home;
