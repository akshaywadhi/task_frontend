import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";

export default function Dashboard() {
 
  const [allTask, setAllTask] = useState([]);
  const [addTask, setAddTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    createdOn: format(new Date(), 'yyyy-MM-dd'),
  });
  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();


  const getAllTask = async () => {
    try {
      const res = await axios.get("http://localhost:4000/getAllTask", {
        withCredentials : true
      });
      if (res.data) {
        setAllTask(res.data.tasks || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTask = (e) => {
    setAddTask((task) => ({
      ...task,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNewTask = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editId !== null) {
        res = await axios.put(`http://localhost:4000/editTask/${editId}`, addTask, {
          withCredentials : true
        });
        setEditId(null);
        toast.success("Task Updated");
      } else {
        res = await axios.post("http://localhost:4000/addTask", addTask, {
          withCredentials: true
        });
        toast.success("Task Added");
      }
      getAllTask();
      setAddTask({
        title: "",
        description: "",
        status: "Pending",
        createdOn: format(new Date(), 'yyyy-MM-dd')
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };

  useEffect(() => {

    getAllTask();
  }, []);

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/deleteTask/${id}`, {
        withCredentials : true
      });
      toast.success(res.data.message);
      getAllTask();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting task");
    }
  };

  const updateTask = (id) => {
    const task = allTask.find((task) => task._id === id);
    setAddTask(task);
    setEditId(id);
  };


  const logout = async () => {

    try {
     const data =  await axios.get("http://localhost:4000/logout",  {
        withCredentials: true
      });
      toast.success(data.data.message);
      localStorage.removeItem('isLogged')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (search === "") {
      getAllTask();
      return;
    }
  },[search])

  const handleSearch = async () => {
    try {
      if (search === "") {
        getAllTask();
        return;
      }
  
      const res = await axios.get(`http://localhost:4000/search?query=${search}`, {
        withCredentials : true
      });
      setAllTask(res.data.tasks);
    } catch (err) {
      toast.error("Search failed");
      console.log(err)
    }
  };

  

  return (
    <>
      <ToastContainer />

      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Task Manager</h2>

        <div className="flex justify-end">
  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={logout}>
    Logout
  </button>
</div>
        <form className="bg-white shadow-md rounded-xl p-6 mb-8 space-y-4" onSubmit={handleNewTask}>
          <h3 className="text-lg font-semibold">{editId ? "Update Task" : "Add New Task"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Date</label>
              <input
                type="date"
                name="createdOn"
                value={addTask.createdOn}
                onChange={handleAddTask}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={addTask.title}
                onChange={handleAddTask}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              value={addTask.description}
              onChange={handleAddTask}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              name="status"
              value={addTask.status}
              onChange={handleAddTask}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              {editId ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>

        <div>
              <label className="block text-sm mb-1 font-bold text-xl">Search</label>
              <input
                type="text"
                placeholder="Add Search Text Here"
                className="w-70 p-2 my-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <span className="mx-2">press enter to search and remove complete search text to fetch all tasks</span>
            
            </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allTask.map((task, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{task.description}</p>
                <p className="text-sm text-yellow-600">Status: {task.status}</p>
                <p className="text-xs text-gray-500">{task.createdOn}</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600"
                  onClick={() => updateTask(task._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
