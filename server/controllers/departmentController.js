import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
    try{
        const departments = await Department.find()
        return res.status(200).json({success: true, departments})
    }catch(error){
        return res.status(500).json({success: false, error: "get department server error"})

    }
}
const addDepartment = async (req, res) => {
    try {
      const { dep_name, description } = req.body;
  
      if (!dep_name || !description) {
        return res.status(400).json({ success: false, error: "All fields are required" });
      }
  
      const newDep = new Department({ dep_name, description });
      await newDep.save();
  
      return res.status(201).json({ success: true, department: newDep });
    } catch (error) {
      console.error("Add Department Error:", error);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  };
    
const getDepartment = async (req, res) => {
    try{
        const {id} = req.params;
        const department = await Department.findById(id);
        return res.status(200).json({success: true, department})
    }catch(error){
        return res.status(500).json({success: false, error: "get department server error"})

    }
}

const updateDepartment = async (req, res) => {
    try {
      const { id } = req.params;
      const { dep_name, description } = req.body;
  
      const updatedDep = await Department.findByIdAndUpdate(
        id,
        { dep_name, description },
        { new: true }
      );
  
      if (!updatedDep) {
        return res.status(404).json({ success: false, error: "Department not found" });
      }
  
      return res.status(200).json({ success: true, department: updatedDep });
    } catch (error) {
      console.error("Update Department Error:", error);
      return res.status(500).json({ success: false, error: "edit department server error" });
    }
  };
  
const deleteDepartment = async (req, res) => {
    try {
      const { id } = req.params;  
      const deleteDep = await Department.findById({_id: id})
      await deleteDep.deleteOne()
      return res.status(200).json({ success: true, department: deletedDep });
    } catch (error) {
      return res.status(500).json({ success: false, error: "delete department server error" });
    }
}


export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment}