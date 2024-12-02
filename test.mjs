import axios from 'axios';

const fetchData = async () => {
  const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoxLCJsb2dpbklkIjoidGVzdCIsImNhdGVnb3J5IjoiYWNjZXNzVG9rZW4iLCJyb2xlIjoiUk9MRV9VU0VSIn0sImlhdCI6MTczMzEwNzQ1MywiZXhwIjoxNzMzMTExMDUzfQ.g5yV1LyJeO1zWPWn9Fw8rpNAiVujcZlFUbfvyOVShzs';
  
  const response = await axios.get('http://flowday.kro.kr:5000/api/v1/courses/1', {
    headers: {
      'Authorization': token,
    },
  });
  console.log(response.data);
};

fetchData();
