import axios from 'axios';

const fetchData = async () => {
  const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoxLCJyb2xlIjoiUk9MRV9VU0VSIiwiY2F0ZWdvcnkiOiJhY2Nlc3NUb2tlbiIsImxvZ2luSWQiOiJ0ZXN0In0sImlhdCI6MTczMzEyMDc4NSwiZXhwIjoxNzMzMTI0Mzg1fQ.6rJUJ9Hjb53vfKHPQ6FVPaSg7JBqq9UGORmQS6o09gU';
  
  const response = await axios.get('http://flowday.kro.kr:5000/api/v1/courses/1', {
    headers: {
      'Authorization': token,
    },
  });
  console.log(response.data);
};

fetchData();
