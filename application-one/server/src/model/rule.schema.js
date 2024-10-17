// models/rule.js
import mongoose from "mongoose";

const astNodeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["operator", "operand"],
    required: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed, // AND/OR or a comparison value
    required: true,
  },
  left: {
    type: mongoose.Schema.Types.Mixed, // Either AST node or null
    default: null,
  },
  right: {
    type: mongoose.Schema.Types.Mixed, // Either AST node or null
    default: null,
  },
});

// Define main schema for rules
const ruleSchema = new mongoose.Schema(
  {
    ruleString: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    ast: {
      type: astNodeSchema,
      required: true,
    },
    ruleName: {
      type: String,
      trim: true,
      default: "Unnamed Rule",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to update 'updatedAt' before saving
ruleSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Rule", ruleSchema);
