import mongoose from 'mongoose';

const CustomTemplateSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  emoji: {
    type: String,
    default: '✨'
  },
  gradient: {
    type: String,
    default: 'linear-gradient(135deg, #7c3aed, #06b6d4)'
  },
  pillar: {
    type: String,
    enum: ['futuristic', 'cinematic', 'bento', 'artistic', 'custom'],
    default: 'custom'
  },
  pillarLabel: {
    type: String,
    default: 'Custom'
  },
  defaultBg: { type: String, default: '#050510' },
  defaultText: { type: String, default: '#f0eeff' },
  defaultAccent: { type: String, default: '#7c3aed' },
  defaultMessage: { type: String, default: 'Un mensaje muy especial para ti.' },
  effect: { type: String, default: 'typewriter' },
  
  htmlTemplate: {
    type: String,
    required: true
  },
  cssTemplate: {
    type: String,
    default: ''
  },
  jsTemplate: {
    type: String,
    default: ''
  },
  htmlBasicTemplate: {
    type: String,
    default: ''
  },
  cssBasicTemplate: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.CustomTemplate || mongoose.model('CustomTemplate', CustomTemplateSchema);
