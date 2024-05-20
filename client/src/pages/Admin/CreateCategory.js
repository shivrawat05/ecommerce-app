import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
const CreateCategory = () => {
const [categories, setCategories] = useState([]);
const [name, setName] = useState("");
const [selected, setSelected] = useState("");
const [updatedName, setUpdatedName] = useState("");

// Handle Form
const handleSubmit = async (e) => {
e.preventDefault();
try {
const { data } = await axios.post("/api/v1/category/create-category", {
name,
});
if (data?.success) {
toast.success(`${name} is created`);
getAllCategory();
} else {
toast.error(data.message);
}
} catch (error) {
console.log(error);
toast.error("Something went wrong in the input form");
}
};

// Get all categories
// Get all categories
const getAllCategory = async () => {
  try {
    const { data } = await axios.get("/api/v1/category/get-category"); // Change axios.post to axios.get
    if (data.success) {
      setCategories(data.category);
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};
useEffect(() => {
getAllCategory();
}, []);

// Update category
const handleUpdate = async (id, updatedName) => {
try {
const { data } = await axios.put(
`/api/v1/category/update-category/${id}`,
{ name: updatedName }
);
if (data.success) {
toast.success(`${updatedName} is updated`);
getAllCategory();
} else {
toast.error(data.message);
}
} catch (error) {
toast.error("Something went wrong");
}
};

// Delete category
const handleDelete = async (id) => {
try {
const { data } = await axios.delete(
`/api/v1/category/delete-category/${id}`
);
if (data.success) {
toast.success(`Category is deleted`);
getAllCategory();
} else {
toast.error(data.message);
}
} catch (error) {
toast.error("Something went wrong");
}
};

return (
<Layout title={"Dashboard - Create Category"}>
<div className="container-fluid m-3 p-3">
<div className="row">
<div className="col-md-3">
<AdminMenu />
</div>
<div className="col-md-9">
<h1>Manage Category</h1>
<div className="p-3 w-50">
<CategoryForm
             handleSubmit={handleSubmit}
             value={name}
             setValue={setName}
           />
</div>
<div className="w-75">
<table className="table">
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Actions</th>
</tr>
</thead>
<tbody>
{categories?.map((c) => (
<tr key={c._id}>
<td>{c.name}</td>
<td>
<button
className="btn btn-primary ms-2"
onClick={() => {
setUpdatedName(c.name);
setSelected(c._id);
handleUpdate(c._id, updatedName);
}}
>
Edit
</button>
<button
className="btn btn-danger ms-2"
onClick={() => handleDelete(c._id)}
>
Delete
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>
</div>
</Layout>
);
};

export default CreateCategory;

