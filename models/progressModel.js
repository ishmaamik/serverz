import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  completedLessons: {
    type: [String], // An array to store lesson IDs that have been completed
    default: [],
  },
  progress: {
    type: Number, // Store the progress as a percentage
    default: 0,
  },
}, { timestamps: true });

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
