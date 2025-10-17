interface Props {
    src?: string;
    alt?: string;
    className?: string;
}

export const ServiceImage: React.FC<Props> = ({ src, alt, className }) => (
    <img
        src={src || '/img/cover_image.png'}
        alt={alt}
        className={`w-full aspect-auto rounded-xl object-cover ${className}`}
    />
)