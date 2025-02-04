import mongoose from "mongoose";

const researchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requestId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  wordCount: {
    type: Number,
    default: null,
  },
  professional: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["in_progress", "completed", "failed"],
    default: "in_progress",
  },
  networkType: {
    type: String,
    enum: ["Professional Network", "General"],
    default: "General",
  },
  tags: [
    {
      type: String,
    },
  ],
  favorite: {
    type: Boolean,
    default: false,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Research ||
  mongoose.model("Research", researchSchema);
