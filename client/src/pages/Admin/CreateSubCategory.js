import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "./../../components/Layout/Layout";
const CreateSubCategory = () => {
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
        setCategories(response.data.category);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCategories();
  }, []);
  return (
    <Layout>
    <div>CreateSubCategory</div>
    <div>
      <h1>All Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
    </Layout>
  )
}
export default CreateSubCategory;