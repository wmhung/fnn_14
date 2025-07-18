function StarDisplay({
  rating,
  maxRating = 5,
  size = 20,
  color = '#fcc419',
  font_color = 'black',
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: `${size * 0.7}px`, font_color: font_color }}>
        {rating}
      </span>
      <div style={{ display: 'flex', gap: '4px' }}>
        {Array.from({ length: maxRating }, (_, i) => (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill={i < rating ? color : 'none'}
            stroke={color}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default StarDisplay;
