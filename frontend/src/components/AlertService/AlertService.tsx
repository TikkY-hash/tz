let showSnackbar: ((msg: string, severity: 'success' | 'error') => void) | null = null;

export const AlertService = {
  register(fn: typeof showSnackbar) {
    showSnackbar = fn;
  },
  success(msg: string) {
    showSnackbar?.(msg, 'success');
  },
  error(msg: string) {
    showSnackbar?.(msg, 'error');
  },
};
