// BlogList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogForm from './BlogForm';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await axios.get('http://localhost:9000/api/blogs');
    setBlogs(response.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await axios.delete(`http://localhost:9000/api/blogs/${id}`);
      fetchBlogs();
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
  };

  const handleSuccess = () => {
    fetchBlogs();
    setEditingBlog(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <BlogForm blogId={editingBlog?._id} onSuccess={handleSuccess} />
      <ul className="space-y-6 mt-8">
        {blogs.map((blog) => (
          <li key={blog._id} className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-700">{blog.description}</p>
            <div className="flex space-x-4 mt-4">
              {blog.images.map((image, index) => (
                <img
                  key={index}
                  src={`/${image}`}
                  alt="Blog Image"
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
            <div className="flex space-x-4 mt-4">
              {blog.videos.map((video, index) => (
                <video
                  key={index}
                  controls
                  className="w-24 h-24 object-cover rounded"
                >
                  <source src={`/${video}`} type="video/mp4" />
                </video>
              ))}
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEdit(blog)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
