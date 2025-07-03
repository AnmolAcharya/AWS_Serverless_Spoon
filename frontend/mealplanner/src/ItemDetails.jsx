import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMeal, updateMeal, deleteMeal } from "./utils/apis";
import "./Home.css";
import groceryImg from "./assets/correct.jpg";

const ItemDetails = () => {
  const { userID, itemID } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getMeal(userID, itemID).then(data => setItem(data));
  }, [userID, itemID]);

  const toggleEditMode = () => setEditMode(!editMode);

  const handleUpdate = async () => {
    await updateMeal(userID, itemID, item);
    toggleEditMode();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteMeal(userID, itemID);
      navigate("/");
    }
  };

  if (!item) return <div className="details-loading"><p>Loading item details...</p></div>;

  return (
    <div className="details-container">
      <div className="details-header">
        <button className="back-button" onClick={() => navigate("/")}>Back</button>
        <h1>Item Details</h1>
      </div>
      <div className="details-content-wrapper">
        <div className="details-card">
          {editMode ? (
            <div className="edit-form">
              <h2>Edit Item</h2>
              <div className="form-group">
                <label>Item Name</label>
                <input className="styled-input" value={item.itemName} onChange={e => setItem({ ...item, itemName: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="styled-input" value={item.itemCategory} onChange={e => setItem({ ...item, itemCategory: e.target.value })}>
                  <option value="Fruit">Fruit</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Meat">Meat</option>
                  <option value="Grain">Grain</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input className="styled-input" type="number" value={item.itemQty} onChange={e => setItem({ ...item, itemQty: Number(e.target.value) })} />
              </div>
              <div className="form-group">
                <label>Units</label>
                <input className="styled-input" value={item.itemUnit} onChange={e => setItem({ ...item, itemUnit: e.target.value })} />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" checked={item.Expired} onChange={e => setItem({ ...item, Expired: e.target.checked })} />
                  Expired?
                </label>
              </div>
              <div className="button-group">
                <button className="save-button" onClick={handleUpdate}>Save Changes</button>
                <button className="cancel-button" onClick={toggleEditMode}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="details-content">
              <div className="item-header">
                <div className="item-logo-container">
                  <img src={groceryImg} alt={item.itemName} className="item-logo" />
                </div>
                <h2>{item.itemName}</h2>
              </div>
              <div className={`category-badge ${item.itemCategory?.toLowerCase()}`}>{item.itemCategory}</div>
              <div className="details-grid">
                <div className="info-card">
                  <h3>Quantity</h3>
                  <p>{item.itemQty} {item.itemUnit}</p>
                </div>
                <div className="info-card">
                  <h3>Status</h3>
                  <p>{item.Expired ? "Expired" : "Fresh"}</p>
                </div>
              </div>
              <div className="action-buttons">
                <button className="edit-button" onClick={toggleEditMode}>Edit Item</button>
                <button className="delete-button" onClick={handleDelete}>Delete Item</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getMeal, updateMeal, deleteMeal } from "./utils/apis";
// import "./Home.css";

// const ItemDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [item, setItem] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     // For now, use dummy userID (replace with real userID if needed)
//     getMeal("dummyUser", id).then(data => setItem(data.Item));
//   }, [id]);

//   const toggleEditMode = () => setEditMode(!editMode);

//   const handleUpdate = async () => {
//     await updateMeal("dummyUser", id, item);
//     toggleEditMode();
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this item?')) {
//       await deleteMeal("dummyUser", id);
//       navigate("/");
//     }
//   };

//   if (!item) return <div className="details-loading"><p>Loading item details...</p></div>;

//   return (
//     <div className="details-container">
//       <div className="details-header">
//         <button className="back-button" onClick={() => navigate("/")}>Back</button>
//         <h1>Item Details</h1>
//       </div>
//       <div className="details-content-wrapper">
//         <div className="details-card">
//           {editMode ? (
//             <div className="edit-form">
//               <div className="form-header"><h2>Edit Item</h2></div>
//               <div className="form-content">
//                 <div className="form-group">
//                   <label>Item ID</label>
//                   <input className="styled-input" value={item.itemId} onChange={e => setItem({ ...item, itemId: e.target.value })} />
//                 </div>
//                 <div className="form-group">
//                   <label>Item Name</label>
//                   <input className="styled-input" value={item.name} onChange={e => setItem({ ...item, name: e.target.value })} />
//                 </div>
//                 <div className="form-group">
//                   <label>Category</label>
//                   <select className="styled-input" value={item.category} onChange={e => setItem({ ...item, category: e.target.value })}>
//                     <option value="Fruit">Fruit</option>
//                     <option value="Vegetable">Vegetable</option>
//                     <option value="Dairy">Dairy</option>
//                     <option value="Meat">Meat</option>
//                     <option value="Grain">Grain</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Quantity</label>
//                   <input className="styled-input" type="number" value={item.qty} onChange={e => setItem({ ...item, qty: e.target.value })} />
//                 </div>
//                 <div className="form-group">
//                   <label>Units</label>
//                   <input className="styled-input" value={item.units} onChange={e => setItem({ ...item, units: e.target.value })} />
//                 </div>
//                 <div className="form-group checkbox-group">
//                   <label>
//                     <input type="checkbox" checked={item.expired} onChange={e => setItem({ ...item, expired: e.target.checked })} />
//                     <span>Expired?</span>
//                   </label>
//                 </div>
//               </div>
//               <div className="button-group">
//                 <button className="save-button" onClick={handleUpdate}>Save Changes</button>
//                 <button className="cancel-button" onClick={toggleEditMode}>Cancel</button>
//               </div>
//             </div>
//           ) : (
//             <div className="details-content">
//               <div className="item-header">
//                 <div className="item-logo-container">
//                   <img src="/grocery.png" alt={item.name} className="item-logo" />
//                 </div>
//                 <h2>{item.name}</h2>
//               </div>
//               <div className={`category-badge ${item.category?.toLowerCase()}`}>{item.category}</div>
//               <div className="details-grid">
//                 <div className="info-card">
//                   <h3>Quantity</h3>
//                   <p>{item.qty} {item.units}</p>
//                 </div>
//                 <div className="info-card">
//                   <h3>Status</h3>
//                   <p>{item.expired ? "Expired" : "Fresh"}</p>
//                 </div>
//               </div>
//               <div className="action-buttons">
//                 <button className="edit-button" onClick={toggleEditMode}>Edit Item</button>
//                 <button className="delete-button" onClick={handleDelete}>Delete Item</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemDetails; 