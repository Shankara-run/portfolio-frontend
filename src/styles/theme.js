// Modern Color Theory Based Theme System
export const mainTheme = {
  // Primary Colors - Blue-based professional palette
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Secondary Colors - Complementary orange/amber
  secondary: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Neutral Colors - Warm grays
  neutral: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },

  // Success, Warning, Error colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',

  // Background gradients
  gradients: {
    primary: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
    secondary: 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50',
    card: 'bg-gradient-to-br from-white to-blue-50/30',
    sidebar: 'bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900',
  },

  // Component styles
  container: 'bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 mb-6 hover:shadow-xl transition-all duration-300',
  card: 'bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-blue-100/50 p-4 hover:shadow-lg transition-all duration-300',
  text: {
    primary: 'text-gray-800',
    secondary: 'text-gray-600',
    accent: 'text-blue-600',
    heading: 'text-gray-900 font-bold',
  },
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200',
  }
};

export const hiddenTheme = {
  // Primary Colors - Deep red/crimson palette for hidden mode
  primary: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Secondary Colors - Complementary dark green
  secondary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Neutral Colors - Cool dark grays
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Success, Warning, Error colors (darker theme)
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626',

  // Background gradients
  gradients: {
    primary: 'bg-gradient-to-br from-red-50 via-rose-50 to-pink-50',
    secondary: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
    card: 'bg-gradient-to-br from-white to-red-50/30',
    sidebar: 'bg-gradient-to-b from-red-900 via-red-800 to-rose-900',
  },

  // Component styles
  container: 'bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 mb-6 hover:shadow-xl transition-all duration-300',
  card: 'bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-red-100/50 p-4 hover:shadow-lg transition-all duration-300',
  text: {
    primary: 'text-gray-800',
    secondary: 'text-gray-600',
    accent: 'text-red-600',
    heading: 'text-gray-900 font-bold',
  },
  button: {
    primary: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200',
  }
};
