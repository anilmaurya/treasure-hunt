import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

// examples:
import GoogleMap from './GoogleMap';
import Layout from './Layout';
import Modal from "../components/Modal";

const Label =  styled.label`
  text-align: center;
  font-size: larger;
  display: block;
  margin: 5px;
`;
// Re-center map when resizing the window
const bindResizeListener = (map, maps, _this) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      console.log(map);
    });
  });

  maps.event.addListener(map, 'idle', function() {
    fetch(process.env.REACT_APP_API_BASE_URL + '/hunt?coordinates=' + map.getBounds().toUrlValue()+ '&zoom=' + map.zoom)
      .then(res => res.json())
      .then(
        (res) => {
          if(res.result.lat){
            var marker = new maps.Marker({
              position: {lat: res.result.lat, lng: res.result.long},
              map
            })
            maps.event.trigger(map,'resize')
            marker.addListener('click', function() {
              _this.showModal()
            });
          }
        },
        (error) => {
          console.log(error)
        }
      )
  })
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, _this) => {
  // new maps.Marker({
  //   position: {lat: 47.07, lng: 2.08},
  //   map
  // })
  bindResizeListener(map, maps, _this);
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    show: false
  };

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  

  render() {
    const { _this } = this;
    return (
        <Fragment>
          <Modal onClose={this.showModal} show={this.state.show}>
            <h4>Enter your name to be part of Hall of Fame</h4>
            <input id="name" name="name" type="text" required />
          </Modal>
          <Layout/>
          {
            <GoogleMap
              defaultZoom={1}
              defaultCenter={{
                lat: 40.854885,
                lng: 88.081807
              }}
              mapTypeId={map => map.MapTypeId.SATELLITE}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps, _this }) => apiIsLoaded(map, maps, this)}
            >
            </GoogleMap>
          }
          <Label>
            Many cultures saw me as a sign of impending death.
            <br></br>
            Buried since 1993, my location is still a mystery.
            <br></br>
            2nd clue will bring you closer to me.
          </Label>
        </Fragment>
    );
  }
}

export default Main;
