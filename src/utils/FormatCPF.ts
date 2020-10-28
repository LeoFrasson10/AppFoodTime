// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function formatCPf(value: string) {
  if (value) {
    const cpf = value.replace(/\D/g, '');

    if (cpf.length === 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    }
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }
  return false;
}
