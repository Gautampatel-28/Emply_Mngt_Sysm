import Department from "../models/department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({
      dep_name,
      description,
    });
    await newDep.save();

    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add department server error" });
  }
};

const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "edit department server error !" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const {dep_name, description} = req.body;
    const updateDep = await Department.findByIdAndUpdate({_id: id}, {
      dep_name,
      description,
    })
    return res.status(200).json({status: true, updateDep})
  } catch (error) {
    console.log(error);
    return res.status(500).json({status: false, error: "edit department server error !"})
  }
};

export { addDepartment, getDepartments, editDepartment, updateDepartment };
