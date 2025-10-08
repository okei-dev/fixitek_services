interface Props {
    src?: string;
    alt?: string;
    className?: string;
}

export const ServiceImage: React.FC<Props> = ({ src, alt, className }) => (
    <img
        src={src || '/img/fixitek_handyman.png'}
        alt={alt}
        className={`w-full aspect-square rounded-xl object-cover ${className}`}
    />
)