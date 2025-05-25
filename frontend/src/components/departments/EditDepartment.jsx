import React, {useEffect, useState} from 'react'
import { useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
    const {id} = useParams()
    const [department, setDepartment] = useState([])
    const [depLoading, setDepLoading] =  useState(false);
     const navigate = useNavigate();


    useEffect(() => {
        const fetchDepartments = async () => {
          setDepLoading(true)
          try {
            const response = await axios.get(`https://ems-backend-w2zv.onrender.com/api/department/${id}`, 
                {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
    
            if (response.data.success) {
              setDepartment(response.data.department)
            }
          } catch (error) {
            if(error.response && !error.response.data.success) {
              alert(error.response.data.error)
          }
          }finally{
            setDepLoading(false)
          }
        };
    
        fetchDepartments();
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
      }

      const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const response = await axios.put(`https://ems-backend-w2zv.onrender.com/api/department/${id}` , department, {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              }
            });
      
            if (response.data.success) {
              navigate("/admin-dashboard/departments");
            }
          } catch (error) {
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error);
            } else {
              alert("Something went wrong");
            }
          }
        };
    
  return (
    <>{depLoading ? <div>Loading...</div> :
      <div className="w-full mt-8 min-h-screen flex justify-center items-center px-4 bg-gray-50">
  <div className="max-w-4xl w-full bg-white p-8 rounded-md shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Edit Department</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="dep_name"
          className='text-sm font-medium text-gray-700 block mb-2'
        >
          Department Name
        </label>
        <input
          id="dep_name"
          type="text"
          name="dep_name"
          onChange={handleChange}
          value={department.dep_name}
          placeholder='Enter Department Name'
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
          required
        />
      </div>
  
      <div>
        <label
          htmlFor="description"
          className='block text-sm font-medium text-gray-700 mb-2'
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          onChange={handleChange}
          value= {department.description}
          placeholder='Enter Department Description'
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
          rows="4"
          required
        />
      </div>
  
      <button
        type="submit"
        className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
      >
        Edit Department
      </button>
    </form>
  </div>
  </div>
   }</>
  )
}

export default EditDepartment
