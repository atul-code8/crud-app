import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get("https://crud-app-web-service.vercel.app/items");
    setItems(response.data);
  };

  const createItem = async () => {
    const response = await axios.post("https://crud-app-web-service.vercel.app/items", {
      name,
      description,
    });
    setItems([...items, response.data]);
    setName("");
    setDescription("");
  };

  const updateItem = async (id) => {
    const response = await axios.put(`https://crud-app-web-service.vercel.app/${id}`, {
      name,
      description,
    });
    setItems(items.map((item) => (item._id === id ? response.data : item)));
    setName("");
    setDescription("");
    setEditing(false);
    setCurrentItem({});
  };

  const deleteItem = async (id) => {
    await axios.delete(`https://crud-app-web-service.vercel.app/items/${id}`);
    setItems(items.filter((item) => item._id !== id));
  };

  const handleEdit = (item) => {
    setEditing(true);
    setName(item.name);
    setDescription(item.description);
    setCurrentItem(item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateItem(currentItem._id);
    } else {
      createItem();
    }
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>CRUD Application</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          type="text"
          placeholder="Description"
          rows={5}
          value={description}
          maxLength={400}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{editing ? "Update" : "Add"}</button>
      </form>
      <section style={{ display: "flex",justifyContent: "center", flexWrap: "wrap", gap: "2rem", margin: "2rem 0" }}>
        {items?.map((item) => (
          <div className="card" key={item._id}>
            <button
              style={{
                position: "absolute",
                right: "4.5rem",
                top: "0.5rem",
                cursor: "pointer",
              }}
              onClick={() => handleEdit(item)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 32 32"
              >
                <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"></path>
              </svg>
            </button>
            <button
              style={{
                position: "absolute",
                right: "0.5rem",
                top: "0.5rem",
                cursor: "pointer",
              }}
              onClick={() => deleteItem(item._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
              </svg>
            </button>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
