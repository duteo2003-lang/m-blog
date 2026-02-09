export const colors = {
    text: {
        primary: "text-[var(--color-text-primary)]",
        secondary: "text-[var(--color-text-secondary)]",
        muted: "text-[var(--color-text-muted)]",
        accent: "text-[var(--color-text-accent)]",
    },
    background: {
        code: "bg-[var(--color-bg-code)]",
        surface: "bg-[var(--color-bg-surface)]",
    },
    border: {
        default: "border-[var(--color-border-default)]",
    },
} as const;

export const typography = {
    body: {
        base: "text-sm sm:text-base",
        small: "text-xs sm:text-sm",
    },
} as const;
export const spacing = {
    ol: "ml-4 mb-3 space-y-1.5 sm:ml-6 sm:mb-4 sm:space-y-2",
    ul: "ml-4 mb-3 space-y-1.5 sm:ml-6 sm:mb-4 sm:space-y-2",
    li: "mb-0.5 sm:mb-1",
    paragraph: "mb-3 sm:mb-4",
    link: "mb-3 space-y-1.5 ml-3 sm:mb-4 sm:space-y-2 sm:ml-4",
    code: "px-1 py-0.5",
    block: "my-3 sm:my-4",
} as const;
export const container = {
    maxWidth: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
        full: "max-w-full",
    },
    padding: {
        mobile: "px-4",
        tablet: "px-6 sm:px-8",
        desktop: "px-4 sm:px-6 lg:px-8",
    },
} as const;