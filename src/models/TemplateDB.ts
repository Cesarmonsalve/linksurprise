import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
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
  description: {
    type: String,
    default: 'Generada por Inteligencia Artificial.'
  },
  isPremium: {
    type: Boolean,
    default: true
  },
  html: {
    type: String,
    required: true
  },
  css: {
    type: String,
    default: ''
  },
  js: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.TemplateDB || mongoose.model('TemplateDB', TemplateSchema);
