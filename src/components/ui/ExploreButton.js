import Link from 'next/link';

export default function ExploreButton({ href, onClick, children = 'Explore Now', className = '' }) {
  const content = <span className="text-wrapper">{children}</span>;

  if (href) {
    return (
      <Link href={href} className={`explore-button ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={`explore-button ${className}`} onClick={onClick}>
      {content}
    </button>
  );
}
