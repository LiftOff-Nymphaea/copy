import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateItem from "./UpdateItem";

export default function ItemsList() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState({ update: false });
  const handleClose = () => {
    setOpen({ update: false, Id: "" });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) return "Error: $ {error.message}";
  if (!items) return "No items";

  return (
    <>
      <h1 className="m-5 text-center">Items List</h1>
      <div className="item-list-table m-5">
        <table className="table table-bordered table-striped ">
          <thead>
            <tr className="table-dark text-center">
              <td> Name </td>
              <td> Quantity </td>
              <td> Description </td>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <tr key={item.id}>
                  <td> {item.itemName} </td>
                  <td> {item.itemQuantity} </td>
                  <td> {item.description} </td>
                  <td>
                    <button
                      className="viewItemButton"
                      onClick={() =>
                        setOpen({ ...open, update: true, id: item.id })
                      }
                    >
                      Edit
                    </button>
                    {open.update && open.id === item.id && (
                      <UpdateItem
                        onClose={handleClose}
                        toEditTitle={item.itemName}
                        toEditItemQuantity={item.itemQuantity}
                        toEditDescription={item.description}
                        item={item.id}
                      />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
