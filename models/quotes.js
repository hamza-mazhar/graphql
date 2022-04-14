import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  by: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
});

mongoose.model("Quote", quoteSchema);
