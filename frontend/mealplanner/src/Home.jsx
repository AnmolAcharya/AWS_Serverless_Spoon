import { useEffect, useState } from "react";
import { fetchMeals, createMeal } from "./utils/apis";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import ChatBot from "./ChatBot";
import correctImg from "./assets/correct.jpg";
import spoonImg from "./assets/spoon.avif";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="item-card" onClick={() => navigate(`/details/${item.userID}/${item.itemID}`)}>
      <div className="item-logo-wrapper">
        <img src={correctImg} alt={item.itemName} className="item-logo" />
      </div>
      <h3>{item.itemName}</h3>
      <div className={`category-badge ${item.itemCategory?.toLowerCase()}`}>{item.itemCategory}</div>
      <div className="item-info">
        <p>Qty: {item.itemQty} {item.itemUnit}</p>
        <p>{item.Expired ? "Expired" : "Fresh"}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [items, setItems] = useState([]);
  const [itemID, setItemID] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [itemUnit, setItemUnit] = useState("");
  const [expired, setExpired] = useState(false);

  // Hardcoded userID for now since no Cognito
  const userID = "A101";

  useEffect(() => {
    fetchMeals().then(data => setItems(data));
  }, []);

  const handleAddItem = async () => {
    if (!itemID || !itemName || !itemCategory || !itemQty || !itemUnit) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      userID,
      itemID,
      itemName,
      itemCategory,
      itemQty: Number(itemQty),
      itemUnit,
      Expired: expired,
    };

    await createMeal(newItem);

    // Refresh list
    const updatedItems = await fetchMeals();
    setItems(updatedItems);

    // Reset form
    setItemID("");
    setItemName("");
    setItemCategory("");
    setItemQty("");
    setItemUnit("");
    setExpired(false);
  };

  return (
    <div className="app-container">
      <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <span>Serverless Spoon</span>
        <img src={spoonImg} alt="Spoon" style={{ height: '48px', width: '48px', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 2px 8px rgba(34,34,59,0.10)' }} />
      </header>
      <main className="main-content" style={{ gap: '2.5rem' }}>
        <aside className="sidebar-form">
          <img src={correctImg} alt="Correct" style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem' }} />
          <input
            className="styled-input"
            type="text"
            placeholder="Item ID"
            value={itemID}
            onChange={e => setItemID(e.target.value)}
          />
          <input
            className="styled-input"
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
          />
          <select
            className="styled-input"
            value={itemCategory}
            onChange={e => setItemCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Grain">Grain</option>
            <option value="Other">Other</option>
          </select>
          <input
            className="styled-input"
            type="number"
            placeholder="Quantity"
            value={itemQty}
            onChange={e => setItemQty(e.target.value)}
          />
          <input
            className="styled-input"
            type="text"
            placeholder="Units (e.g. kg, pcs)"
            value={itemUnit}
            onChange={e => setItemUnit(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={expired}
              onChange={e => setExpired(e.target.checked)}
            />
            Fresh?
          </label>
          <button onClick={handleAddItem}>Add Item</button>
        </aside>
        <section className="item-section">
          {items.map(item => (
            <ItemCard key={`${item.userID}-${item.itemID}`} item={item} />
          ))}
        </section>
        <div className="chatbot-column">
          <ChatBot />
        </div>
      </main>
    </div>
  );
};

export default Home;

// import { useEffect, useState } from "react";
// import { fetchMeals, createMeal } from "./utils/apis";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";
// import ChatBot from "./ChatBot";
// import correctImg from "./assets/correct.jpg";
// import spoonImg from "./assets/spoon.avif";

// const ItemCard = ({ item }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="item-card" onClick={() => navigate(`/details/${item.userID}/${item.itemID}`)}>
//       <div className="item-logo-wrapper">
//         <img src={correctImg} alt={item.itemName} className="item-logo" />
//       </div>
//       <h3>{item.itemName}</h3>
//       <div className={`category-badge ${item.itemCategory?.toLowerCase()}`}>{item.itemCategory}</div>
//       <div className="item-info">
//         <p>Qty: {item.itemQty} {item.itemUnit}</p>
//         <p>{item.Expired ? "Expired" : "Fresh"}</p>
//       </div>
//     </div>
//   );
// };

// const Home = () => {
//   const [items, setItems] = useState([]);
//   const [itemID, setItemID] = useState("");
//   const [itemName, setItemName] = useState("");
//   const [itemCategory, setItemCategory] = useState("");
//   const [itemQty, setItemQty] = useState("");
//   const [itemUnit, setItemUnit] = useState("");
//   const [expired, setExpired] = useState(false);

//   // Hardcoded userID for now since no Cognito
//   const userID = "A101";

//   useEffect(() => {
//     fetchMeals().then(data => setItems(data));
//   }, []);

//   const handleAddItem = async () => {
//     if (!itemID || !itemName || !itemCategory || !itemQty || !itemUnit) {
//       alert("Please fill all fields");
//       return;
//     }

//     const newItem = {
//       userID,
//       itemID,
//       itemName,
//       itemCategory,
//       itemQty: Number(itemQty),
//       itemUnit,
//       Expired: expired,
//     };

//     await createMeal(newItem);

//     // Refresh list
//     const updatedItems = await fetchMeals();
//     setItems(updatedItems);

//     // Reset form
//     setItemID("");
//     setItemName("");
//     setItemCategory("");
//     setItemQty("");
//     setItemUnit("");
//     setExpired(false);
//   };

//   return (
//     <div className="app-container">
//       <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
//         <span>Serverless Spoon</span>
//         <img src={spoonImg} alt="Spoon" style={{ height: '48px', width: '48px', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 2px 8px rgba(34,34,59,0.10)' }} />
//       </header>
//       <main className="main-content" style={{ gap: '2.5rem' }}>
//         <aside className="sidebar-form">
//           <img src={correctImg} alt="Correct" style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem' }} />
//           <input
//             className="styled-input"
//             type="text"
//             placeholder="Item ID"
//             value={itemID}
//             onChange={e => setItemID(e.target.value)}
//           />
//           <input
//             className="styled-input"
//             type="text"
//             placeholder="Item Name"
//             value={itemName}
//             onChange={e => setItemName(e.target.value)}
//           />
//           <select
//             className="styled-input"
//             value={itemCategory}
//             onChange={e => setItemCategory(e.target.value)}
//           >
//             <option value="">Select Category</option>
//             <option value="Fruit">Fruit</option>
//             <option value="Vegetable">Vegetable</option>
//             <option value="Dairy">Dairy</option>
//             <option value="Meat">Meat</option>
//             <option value="Grain">Grain</option>
//             <option value="Other">Other</option>
//           </select>
//           <input
//             className="styled-input"
//             type="number"
//             placeholder="Quantity"
//             value={itemQty}
//             onChange={e => setItemQty(e.target.value)}
//           />
//           <input
//             className="styled-input"
//             type="text"
//             placeholder="Units (e.g. kg, pcs)"
//             value={itemUnit}
//             onChange={e => setItemUnit(e.target.value)}
//           />
//           <label>
//             <input
//               type="checkbox"
//               checked={expired}
//               onChange={e => setExpired(e.target.checked)}
//             />
//             Fresh?
//           </label>
//           <button onClick={handleAddItem}>Add Item</button>
//         </aside>
//         <section className="item-section">
//           {items.map(item => (
//             <ItemCard key={`${item.userID}-${item.itemID}`} item={item} />
//           ))}
//         </section>
//         <div className="chatbot-column">
//           <ChatBot />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Home;


// import { useEffect, useState } from "react";
// import { fetchMeals, createMeal } from "./utils/apis";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";

// const ItemCard = ({ item }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="item-card" onClick={() => navigate(`/details/${item.itemId}`)}>
//       <div className="item-logo-wrapper">
//         <img src="/grocery.png" alt={item.name} className="item-logo" />
//       </div>
//       <h3>{item.name}</h3>
//       <div className={`category-badge ${item.category?.toLowerCase()}`}>{item.category}</div>
//       <div className="item-info">
//         <p>Qty: {item.qty} {item.units}</p>
//         <p>{item.expired ? "Expired" : "Fresh"}</p>
//       </div>
//     </div>
//   );
// };

// const Home = () => {
//   const [items, setItems] = useState([]);
//   const [itemId, setItemId] = useState("");
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [qty, setQty] = useState("");
//   const [units, setUnits] = useState("");
//   const [expired, setExpired] = useState(false);

//   useEffect(() => {
//     fetchMeals().then(data => setItems(data.Items || []));
//   }, []);

//   const handleAddItem = async () => {
//     if (!itemId || !name || !category || !qty || !units) {
//       alert("Please fill all fields");
//       return;
//     }
//     const newItem = { itemId, name, category, qty, units, expired };
//     await createMeal(newItem);
//     setItems([...items, newItem]);
//     setItemId("");
//     setName("");
//     setCategory("");
//     setQty("");
//     setUnits("");
//     setExpired(false);
//   };

//   return (
//     <div className="app-container">
//       <header className="header">AWS SERVERLESS MEAL/GROCERY PLANNER (CRUD)</header>
//       <main className="main-content">
//         <aside className="sidebar-form">
//           <input
//             className="styled-input"
//             type="text"
//             placeholder="Item ID"
//             value={itemId}
//             onChange={e => setItemId(e.target.value)}
//           />
//           <input
//             className="styled-input"
//             type="text"
//             placeholder="Item Name"
//             value={name}
//             onChange={e => setName(e.target.value)}
//           />
//           <select
//             className="styled-input"
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//           >
//             <option value="">Select Category</option>
//             <option value="Fruit">Fruit</option>
//             <option value="Vegetable">Vegetable</option>
//             <option value="Dairy">Dairy</option>
//             <option value="Meat">Meat</option>
//             <option value="Grain">Grain</option>
//             <option value="Other">Other</option>
//           </select>
//           <input
//             className="styled-input"
//             type="number"
//             placeholder="Quantity"
//             value={qty}
//             onChange={e => setQty(e.target.value)}
//           />
//           <input
//             className="styled-input"
//             type="text"
//             placeholder="Units (e.g. kg, pcs)"
//             value={units}
//             onChange={e => setUnits(e.target.value)}
//           />
//           <label>
//             <input
//               type="checkbox"
//               checked={expired}
//               onChange={e => setExpired(e.target.checked)}
//             />
//             Expired?
//           </label>
//           <button onClick={handleAddItem}>Add Item</button>
//         </aside>
//         <section className="item-section">
//           {items.map(item => (
//             <ItemCard key={item.itemId} item={item} />
//           ))}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Home; 