'use client'

import { ExitIntentPopup } from './exit-intent-popup'

export function ExitIntentPopupWrapper() {
  const handleAction = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return <ExitIntentPopup onAction={handleAction} />
}