interface ExternalLinkProps {
  href: string;
  title: string;
  children?: string;
}

export const ExternalLink = ({ href, title, children }: ExternalLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        color: '#667eea',
        textDecoration: 'none',
        fontSize: '13px',
        fontWeight: 'normal',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#764ba2';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#667eea';
      }}
      title={title}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: '4px' }}
      >
        <path
          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children || '在系统中打开'}
    </a>
  );
};
