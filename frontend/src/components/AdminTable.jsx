import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from "axios";

Modal.setAppElement('#root'); // This is required for accessibility reasons

const Table = (props) => {
  // Static Data (Initial admins)
  const [data, setData] = useState([
    { id: 1, username: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, username: 'Mohit', email: 'mohit@example.com', phone: '098-765-4321' },
    { id: 3, username: 'Aditya', email: 'aditya@example.com', phone: '098-765-4321' },
    { id: 4, username: 'Suhash', email: 'suhash@example.com', phone: '098-765-4321' },
  ]);

  // New Admin State
  const [newAdmin, setNewAdmin] = useState({ username: '', email: '', phone: '', password: '', confirmPassword: '' });

  // Edit Functionality (Mock)
  const handleEdit = (id) => {
    alert(`Edit user with id: ${id}`);
  };

  // Delete Functionality
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  // Handle opening/closing of modal
  const openModal = () => {
    props.setIsModalOpen(true);
  };

  const closeModal = () => {
    props.setIsModalOpen(false);
    setNewAdmin({ username: '', email: '', phone: '', password: '', confirmPassword: '' }); // Reset form fields
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  // Handle adding a new admin
  const handleAddAdmin = async () => {
    try {
      // Post new admin to backend
      const res = await axios.post('http://localhost:9000/api/users/add-new-user', newAdmin, {
        withCredentials: true // If backend requires cookies/auth
      });

      console.log('Admin added successfully', res.data);

      // After adding admin, update the state to reflect the new admin in the table
      setData([...data, {
        id: data.length + 1, // Ideally use backend ID
        username: newAdmin.username,
        email: newAdmin.email,
        phone: newAdmin.phone
      }]);

      // Close the modal and reset form fields
      closeModal();

    } catch (error) {
      console.error('Error adding admin:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between items-center py-6'>
        <h3>List of all the admins</h3>
        <button className='bg-green-500 text-white py-2 px-6 rounded' onClick={openModal}>
          Add Admin
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="border-b bg-gray-200">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">{item.username}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">{item.phone}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      <Modal
        isOpen={props.isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Admin Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-full sm:max-w-lg mx-auto mt-20"
      >
        <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="username"
              value={newAdmin.username}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={newAdmin.email}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={newAdmin.password}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={newAdmin.confirmPassword}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={newAdmin.phone}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddAdmin}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Add Admin
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Table;
