'use client';
import { useState } from 'react';

/**
 * useFakeSubmit
 * Simulates a realistic form submission: a network delay, occasional
 * randomized failure (so the error state is reachable and testable),
 * and proper idle/loading/success/error states — instead of an instant
 * setSubmitted(true) that reads as obviously decorative.
 */
export function useFakeSubmit({ delayMs = 1100, failRate = 0.08 } = {}) {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async (onSuccess) => {
    setStatus('loading');
    setErrorMessage('');
    await new Promise(resolve => setTimeout(resolve, delayMs));

    if (Math.random() < failRate) {
      setStatus('error');
      setErrorMessage('Something went wrong submitting your form. Please try again.');
      return;
    }

    setStatus('success');
    if (onSuccess) onSuccess();
  };

  const reset = () => { setStatus('idle'); setErrorMessage(''); };

  return { status, errorMessage, submit, reset };
}
