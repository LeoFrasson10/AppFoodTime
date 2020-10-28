// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function formatPhone(value: string) {
  if (value) {
    const phone = value.replace(/\D/g, '');

    if (phone.length > 10) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
    }
    return phone.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');
  }
  return false;
}
