import React, { Component, Fragment } from 'react';

// examples:
import GoogleMap from './GoogleMap';

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
            console.log('adding marker')
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
      </Fragment>
    );
  }
}

export default Main;
