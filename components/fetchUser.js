// fetchUser.js
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchUserDetails = async () => {
  try {
    console.log(token);
    console.log('Fetching user details...');
    const token = await AsyncStorage.getItem('token');
    console.log('Token:', token);

    if (!token) {
      // Token not found
      return null;
    }

    const response = await fetch('http://192.168.1.127:3000/user/details', {
      method: 'GET',
      headers: {
        Authorization : `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('API Response:', response);

    console.log('API Response:', response.status); // Logging the response status

    if (response.ok) {
      const userDetails = await response.json();
      console.log('User Details:', userDetails); // Log the user details
      return userDetails;
    } else {
      // Handling error response from the server
      console.log('Error from server 404');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    // Handling other errors as needed
    return null;
  }
};