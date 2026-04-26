import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    recoveryEmail: {
        type: String,
        default: 'admin@digitalpower.in'
    },
    recoveryToken: {
        type: String,
        default: null
    }
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);
