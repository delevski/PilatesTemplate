import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChatWidget } from './ChatWidget';

describe('ChatWidget', () => {
  it('opens, answers in Hebrew, and closes with focus restoration', async () => {
    render(<ChatWidget initialLanguage="he" />);
    const trigger = screen.getByRole('button', { name: 'Ask Lumina' });
    expect(trigger.querySelector('.chat-trigger-label')).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Lumina Pilates Advisor' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('הודעה'), { target: { value: 'מה המחירים?' } });
    fireEvent.submit(screen.getByLabelText('טופס הודעה'));

    expect(await screen.findByText(/Starter ₪390/)).toHaveAttribute('dir', 'rtl');
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('collects contact details only after booking intent and explicit submission', async () => {
    const submitLeadFn = vi.fn().mockResolvedValue({ id: '1' });
    render(<ChatWidget initialLanguage="en" submitLeadFn={submitLeadFn} />);

    fireEvent.click(screen.getByRole('button', { name: 'Ask Lumina' }));
    expect(screen.queryByRole('button', { name: 'Share contact details' })).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'I want to book an exact time' } });
    fireEvent.submit(screen.getByLabelText('Message form'));
    fireEvent.click(await screen.findByRole('button', { name: 'Share contact details' }));

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Maya' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '0501234567' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'maya@example.com' } });
    expect(submitLeadFn).not.toHaveBeenCalled();
    fireEvent.submit(screen.getByLabelText('Contact details form'));

    await waitFor(() => expect(submitLeadFn).toHaveBeenCalledWith(expect.objectContaining({ name: 'Maya', session: 'Chat enquiry' })));
    expect(await screen.findByText('Your details were received.')).toBeInTheDocument();
  });

  it('keeps contact details available for retry after lead delivery fails', async () => {
    const submitLeadFn = vi.fn().mockRejectedValue(new Error('offline'));
    render(<ChatWidget initialLanguage="en" submitLeadFn={submitLeadFn} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ask Lumina' }));
    fireEvent.click(screen.getByRole('button', { name: 'Book a session' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Share contact details' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Maya' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '0501234567' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'maya@example.com' } });
    fireEvent.submit(screen.getByLabelText('Contact details form'));

    expect(await screen.findByText(/couldn’t save/)).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveValue('Maya');
  });
});
