const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    typeOperation: {
      type: String,
    },
    comment: {
      type: String,
    },
    sum: {
      type: Number,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // idBankAccount: { type: Schema.Types.ObjectId, ref: 'BankAccount' },
    // bankAccountId: { type: Schema.Types.ObjectId, ref: 'BankAccount' },
    // category: { type: Schema.Types.ObjectId, ref: 'Category' },
    idBankAccount: {
      type: String,
    },
    date: {
      type: Date,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Operation', schema);

// "idBankAccount": "_12-p21LqD4EPrWC4H5pgbaj",
// "comment": "Шахматы12",
// "category": "jnPjBJXFfo5i0XqUONh8P",
// "sum": 2000,
// "addNewCategory": false,
// "newCategory": "",
// "typeOperation": "expense",
// "id": "1kKEiZ6sY2Ew61dWoh6a1T",
// "date": 1682203044317
