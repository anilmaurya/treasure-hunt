import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

// examples:
import GoogleMap from './GoogleMap';
import Layout from './Layout';

const Label =  styled.label`
  text-align: center;
  display: block;
  margin: 5px;
`;
// Re-center map when resizing the window
const bindResizeListener = (map, maps) => {
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
              alert('WON')
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
const apiIsLoaded = (map, maps) => {
  // new maps.Marker({
  //   position: {lat: 47.07, lng: 2.08},
  //   map
  // })
  bindResizeListener(map, maps);
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  render() {
    return (
        <Fragment>
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
              onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            >
            </GoogleMap>
          }
          <Label>
            <i> Many cultures saw me as a sign of impending death.</i>
            <br></br>
            <i> Buried since 1993, my location is still a mystery.</i>
            <br></br>
            <i>
              2nd clue will bring you closer to me.
            </i>
          </Label>
        </Fragment>
    );
  }
}

export default Main;
