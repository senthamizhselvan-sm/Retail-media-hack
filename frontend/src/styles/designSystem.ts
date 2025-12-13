// PixCraft Fluent Design System - Production Grade UI Standards

export const DesignSystem = {
  // 1. COLOR SYSTEM - Neutral-first design
  colors: {
    primary: {
      blue: '#0078D4', // Actions only
    },
    neutrals: {
      background: '#FAFAFA',
      surface: '#FFFFFF',
      border: '#E1E1E1',
      textPrimary: '#1B1B1B',
      textSecondary: '#5F5F5F',
      disabled: '#A6A6A6',
      error: '#D13438',
    },
    states: {
      hover: '#106EBE',
      focus: '#005A9E',
      disabled: '#F3F2F1',
    }
  },

  // 2. TYPOGRAPHY - Segoe UI/Inter only
  typography: {
    fontFamily: '"Segoe UI", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    sizes: {
      h1: { fontSize: '28px', fontWeight: 600, lineHeight: '1.4' },
      h2: { fontSize: '22px', fontWeight: 600, lineHeight: '1.4' },
      h3: { fontSize: '18px', fontWeight: 600, lineHeight: '1.4' },
      body: { fontSize: '14px', fontWeight: 400, lineHeight: '1.5' },
      caption: { fontSize: '12px', fontWeight: 400, lineHeight: '1.6' },
    }
  },

  // 3. SPACING & GRID - 8-point grid system
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },

  layout: {
    maxWidth: '1320px',
    contentMaxWidth: '1100px',
    borderRadius: '8px',
  },

  // 4. COMPONENT STYLES
  components: {
    card: {
      background: '#FFFFFF',
      border: '1px solid #E1E1E1',
      borderRadius: '8px',
      boxShadow: 'none',
      padding: '24px',
    },
    
    button: {
      primary: {
        background: '#0078D4',
        color: '#FFFFFF',
        height: '40px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        padding: '0 16px',
        cursor: 'pointer',
        transition: 'background-color 150ms ease',
      },
      secondary: {
        background: 'transparent',
        color: '#0078D4',
        height: '40px',
        border: '1px solid transparent',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        padding: '0 16px',
        cursor: 'pointer',
        transition: 'border-color 150ms ease',
      },
      destructive: {
        background: 'transparent',
        color: '#D13438',
        height: '40px',
        border: '1px solid transparent',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        padding: '0 16px',
        cursor: 'pointer',
      }
    },

    input: {
      height: '40px',
      border: '1px solid #E1E1E1',
      borderRadius: '4px',
      padding: '0 12px',
      fontSize: '14px',
      fontFamily: '"Segoe UI", "Inter", sans-serif',
      backgroundColor: '#FFFFFF',
      color: '#1B1B1B',
      outline: 'none',
      transition: 'border-color 150ms ease',
    },

    navbar: {
      height: '56px',
      background: '#FFFFFF',
      borderBottom: '1px solid #E1E1E1',
      position: 'sticky' as const,
      top: 0,
      zIndex: 1000,
    }
  },

  // 5. ANIMATIONS - Minimal and purposeful
  animations: {
    fadeIn: {
      opacity: 0,
      animation: 'fadeIn 200ms ease forwards',
    },
    slideUp: {
      transform: 'translateY(12px)',
      opacity: 0,
      animation: 'slideUp 150ms ease forwards',
    }
  }
};

// CSS-in-JS helper functions
export const createStyles = {
  card: (customStyles = {}) => ({
    ...DesignSystem.components.card,
    ...customStyles,
  }),

  button: (variant: 'primary' | 'secondary' | 'destructive' = 'primary', customStyles = {}) => ({
    ...DesignSystem.components.button[variant],
    ...customStyles,
  }),

  input: (customStyles = {}) => ({
    ...DesignSystem.components.input,
    ...customStyles,
  }),

  typography: (variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption' = 'body') => ({
    fontFamily: DesignSystem.typography.fontFamily,
    ...DesignSystem.typography.sizes[variant],
    color: DesignSystem.colors.neutrals.textPrimary,
    margin: 0,
  }),

  layout: {
    container: {
      maxWidth: DesignSystem.layout.maxWidth,
      margin: '0 auto',
      padding: `0 ${DesignSystem.spacing.lg}`,
    },
    
    contentContainer: {
      maxWidth: DesignSystem.layout.contentMaxWidth,
      margin: '0 auto',
      padding: `0 ${DesignSystem.spacing.lg}`,
    },

    grid: (columns: number) => ({
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: DesignSystem.spacing.xl,
    }),

    flexBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }
};

// Global CSS variables for consistency
export const cssVariables = `
  :root {
    --color-primary: ${DesignSystem.colors.primary.blue};
    --color-background: ${DesignSystem.colors.neutrals.background};
    --color-surface: ${DesignSystem.colors.neutrals.surface};
    --color-border: ${DesignSystem.colors.neutrals.border};
    --color-text-primary: ${DesignSystem.colors.neutrals.textPrimary};
    --color-text-secondary: ${DesignSystem.colors.neutrals.textSecondary};
    --color-disabled: ${DesignSystem.colors.neutrals.disabled};
    --color-error: ${DesignSystem.colors.neutrals.error};
    
    --font-family: ${DesignSystem.typography.fontFamily};
    --border-radius: ${DesignSystem.layout.borderRadius};
    
    --spacing-xs: ${DesignSystem.spacing.xs};
    --spacing-sm: ${DesignSystem.spacing.sm};
    --spacing-md: ${DesignSystem.spacing.md};
    --spacing-lg: ${DesignSystem.spacing.lg};
    --spacing-xl: ${DesignSystem.spacing.xl};
    --spacing-xxl: ${DesignSystem.spacing.xxl};
  }

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  @keyframes slideUp {
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family);
    background-color: var(--color-background);
    color: var(--color-text-primary);
    margin: 0;
    padding: 0;
    line-height: 1.5;
  }

  button:hover {
    opacity: 0.9;
  }

  button:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  input:focus, textarea:focus {
    border-color: var(--color-primary);
    outline: 2px solid var(--color-primary);
    outline-offset: -1px;
  }
`;