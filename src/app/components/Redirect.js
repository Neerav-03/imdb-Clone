// RedirectButton.js
'use client'
const RedirectButton = ({result}) => {

  const handleClick = () => {
    window.location.href = `https://binged.in/watch/movie/${result.id}`;
  };

  return (
    <button className="hover:text-amber-600" onClick={handleClick}>
      Watch Now
    </button>
  );
};

export default RedirectButton;
