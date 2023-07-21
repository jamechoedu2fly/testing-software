import React, { useState } from 'react';
import Layout from "./../../components/Layout/Layout";
import axios from 'axios';
const CreateCategory = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/category/create-category`, { name });
      setMessage(response.data.message);
      // You can optionally reset the form here if needed
      setName('');
    } catch (error) {
      setMessage('Error in creating category');
      console.error(error);
    }
  };

  return (
    <Layout> <div>
    <h2>Create Category</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category Name:</label>
        <input type="text" value={name} onChange={handleChange} />
      </div>
      <button type="submit">Create Category</button>
    </form>
    {message && <p>{message}</p>}
  </div>

    </Layout>
  )
}

export default CreateCategory