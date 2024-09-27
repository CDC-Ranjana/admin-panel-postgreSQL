import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const BlogForm = ({ blogId, onSuccess, closeModal,isModalOpen }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (blogId) {
      // Fetch existing blog data for editing
      axios.get(`/api/blogs/${blogId}`).then((response) => {
        const { title, description, images, videos } = response.data;
        setTitle(title);
        setDescription(description);
        setImages(images || []);
        setVideos(videos || []);
        if (images) {
          setImagePreviews(images.map(img => URL.createObjectURL(new Blob([img]))));
        }
      });
    }
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    images.forEach((image) => formData.append('images', image));
    videos.forEach((video) => formData.append('videos', video));

    try {
      if (blogId) {
        // Update existing blog
        await axios.put(`http://localhost:9000/api/blogs/${blogId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Create new blog
        await axios.post('http://localhost:9000/api/blogs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      onSuccess(); // Callback after success
    } catch (error) {
      console.error('Error creating or editing blog', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Append new images to existing images
    const updatedImages = [...images, ...selectedFiles];
    setImages(updatedImages);

    // Generate preview URLs and append to existing previews
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleVideoChange = (e) => {
    setVideos([...videos, ...Array.from(e.target.files)]);
  };

  return (
    // <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 border rounded shadow-md w-[60%] mx-auto">
    <Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    contentLabel="Add Admin Modal"
    className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20 w-[100%]"
  >
      <div>
        <label className="block text-gray-700 font-bold mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-2">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-2">Images:</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full"
        />
        <div className="flex space-x-2 mt-2">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-20 h-20 object-cover border rounded"
            />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-2">Videos:</label>
        <input
          type="file"
          multiple
          onChange={handleVideoChange}
          className="w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {blogId ? 'Update Blog' : 'Create Blog'}
      </button>
      <div className="flex justify-end">
            <button
              type="button"
              
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Add an Activity
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
          </Modal>
  
  );
};

export default BlogForm;
