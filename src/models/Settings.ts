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
  premiumTemplateIds: [{
    type: String
  }],
  landingContent: {
    hero: {
      badge: { type: String, default: 'LO NUEVO EN SORPRESAS' },
      title1: { type: String, default: 'Crea Experiencias' },
      title2: { type: String, default: 'Digitales' },
      title3: { type: String, default: 'Inolvidables' },
      desc: { type: String, default: 'Transforma tus mensajes en momentos mágicos con nuestras plantillas premium e interactivas.' }
    },
    stats: {
      active: { type: String, default: '+1,200' },
      templates: { type: String, default: '20+' },
      satisfaction: { type: String, default: '99%' }
    }
  },
  groqApiKey: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
