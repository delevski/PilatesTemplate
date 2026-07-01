import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { BookingModal } from './BookingModal';

describe('BookingModal', () => {
  it('announces the dialog and validates required fields', async () => {
    render(<BookingModal open onClose={() => {}} />);
    expect(screen.getByRole('dialog', { name: /start your/i })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText(/full name/i)).toHaveFocus());
    await userEvent.click(screen.getByRole('button', { name: /book now/i }));
    expect(await screen.findAllByText(/required/i)).toHaveLength(3);
  });

  it('submits the lead and exposes a WhatsApp continuation', async () => {
    const submitLead = vi.fn().mockResolvedValue({ id: '1', storedAt: 'now' });
    const openWindow = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<BookingModal open onClose={() => {}} submitLeadFn={submitLead} />);
    await userEvent.type(screen.getByLabelText(/full name/i), 'Maya');
    await userEvent.type(screen.getByLabelText(/^phone/i), '0501234567');
    await userEvent.type(screen.getByLabelText(/email/i), 'maya@example.com');
    await userEvent.click(screen.getByRole('button', { name: /book now/i }));
    await waitFor(() => expect(submitLead).toHaveBeenCalledWith(expect.objectContaining({ name: 'Maya' })));
    expect(openWindow).toHaveBeenCalled();
    expect(await screen.findByRole('link', { name: /continue on whatsapp/i })).toBeInTheDocument();
    openWindow.mockRestore();
  });

  it('keeps entered values when lead delivery fails and closes on Escape', async () => {
    const close = vi.fn();
    render(<BookingModal open onClose={close} submitLeadFn={() => Promise.reject(new Error('fail'))} />);
    const name = screen.getByLabelText(/full name/i);
    await userEvent.type(name, 'Maya');
    await userEvent.type(screen.getByLabelText(/^phone/i), '0501234567');
    await userEvent.type(screen.getByLabelText(/email/i), 'maya@example.com');
    await userEvent.click(screen.getByRole('button', { name: /book now/i }));
    expect(await screen.findByText(/couldn’t save/i)).toBeInTheDocument();
    expect(name).toHaveValue('Maya');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(close).toHaveBeenCalled();
  });
});
