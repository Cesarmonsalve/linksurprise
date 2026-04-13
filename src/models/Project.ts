import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Una sorpresa para ti 💝',
  },
  status: {
    type: String,
    enum: ['draft', 'pending_payment', 'paid', 'free'],
    default: 'draft',
  },
  template: {
    type: String,
    required: true,
    default: 'nebula_glass',
  },
  config: {
    recipientName: { type: String, default: '' },
    senderName: { type: String, default: '' },
    backgroundColor: { type: String, default: '#050510' },
    textColor: { type: String, default: '#f0eeff' },
    accentColor: { type: String, default: '#7c3aed' },
    fontFamily: { type: String, default: 'Inter' },
    message: { type: String, default: 'Escribe tu mensaje aquí...' },
    effect: { type: String, default: 'typewriter' },
    musicUrl: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    password: { type: String, default: '' },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'binance', 'zinli', 'whatsapp', 'none'],
    default: 'none'
  },
  referenceNumber: {
    type: String,
    default: ''
  },
  clientPhone: {
    type: String,
    default: ''
  },
  ipAddress: {
    type: String,
    default: ''
  }
});

// Avoid OverwriteModelError in Next.js edge/hot-reload
export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
