import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';

const useCurrentLocation = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Not Granted');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

    return location;
}

export default useCurrentLocation