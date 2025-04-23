type Props = { visible?: boolean };

export const SpinnerOverlay = ({ visible = false }: Props) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin" />
        </div>
    );
};
