const CHECKBOX_BASE =
    'flex shrink-0 items-center justify-center rounded-sm border transition-colors'

const CHECKBOX_UNCHECKED = 'border-gray-300 hover:border-gray-400'
const CHECKBOX_CHECKED = 'border-blue-600 hover:border-blue-700'

interface CheckboxProps {
    checked: boolean
    onChange: (checked: boolean) => void
    width?: number | string
    height?: number | string
    className?: string
}

export const Checkbox = ({
    checked,
    onChange,
    width = 20,
    height = 20,
    className = '',
}: CheckboxProps) => {
    const visualClasses = [
        CHECKBOX_BASE,
        checked ? CHECKBOX_CHECKED : CHECKBOX_UNCHECKED,
    ].join(' ')

    return (
        <label className={`inline-flex items-center cursor-pointer ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className={`peer sr-only`}
            />
            <span
                className={`${visualClasses} peer-focus-visible:ring-1 peer-focus-visible:ring-blue-400`}
                style={{ width, height }}
            >
                {checked && (
                    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 text-blue-600" aria-hidden="true">
                        <path
                            d="M3 8.5L6.5 12L13 4.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </span>
        </label>
    )
}