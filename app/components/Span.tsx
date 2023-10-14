'use client';

interface SpanProps {
    content: string;
}

const Span: React.FC<SpanProps> = ({
    content
}) => {
    return (
        <span className="text-pgray text-sm font-light mb-5">
            {content}
            <a href="#" className="cursor-pointer hover:underline text-pyellow">Terms of Service</a>
        </span>
    )
}

export default Span;
