export function buildWhatsAppUrl(lead, number) {
  const digits = number.replace(/\D/g, '');
  const message = `Hi Lumina, I'm ${lead.name}. I just requested a ${lead.session || 'first session'} and would love to continue here.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
