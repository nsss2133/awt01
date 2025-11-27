const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));

// Item Schema
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

const Item = mongoose.model("Item", itemSchema);

// Add an item
async function addItem() {
  const item = await Item.create({
    name: "Shampoo",
    price: 120,
    quantity: 50
  });
  console.log("Item added:", item);
}

// Update an item
async function updateItem() {
  const updated = await Item.updateOne(
    { name: "Shampoo" },
    { $set: { price: 150 } }
  );
  console.log("Item updated:", updated);
}

// Delete an item
async function deleteItem() {
  const deleted = await Item.deleteOne({ name: "Shampoo" });
  console.log("Item deleted:", deleted);
}

// Stock report (list all items)
async function stockReport() {
  const items = await Item.find();
  console.log("Stock Report:");
  console.table(items);
}

// Run operations
(async function () {
  await addItem();
  await updateItem();
  await stockReport();
  await deleteItem();
  process.exit();
})();
