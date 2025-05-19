import React from 'react'
import AuthDialogFlow from './AuthDialogFlow';

export default function AuthWrapper({ open, onClose, initialStep }) {
  return open ? <AuthDialogFlow onClose={onClose} initialStep={initialStep} /> : null;
}

