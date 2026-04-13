import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  whatsappNumber: {
    type: String,
    default: ''
  },
  binancePayId: {
    type: String,
    default: ''
  },
  zinliEmail: {
    type: String,
    default: ''
  },
  priceInfo: {
    type: String,
    default: '$3 USD'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
