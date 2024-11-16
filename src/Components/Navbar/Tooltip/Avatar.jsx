import React from 'react';

// Avatar Component
const Avatar = ({ src, alt, size = 50, initials }) => {
  // If the image source is not provided or the image fails to load, fallback to initials
  const [hasError, setHasError] = React.useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const renderAvatar = () => {
    if (hasError || !src) {
      return (
        <div style={{ ...styles.avatar, fontSize: size / 2 }}>
          {initials}
        </div>
      );
    } else {
      return <img src={src} alt={alt} style={{ ...styles.avatar, width: size, height: size }} onError={handleError}/>;
    }
  };

  return (
    <div>
      {renderAvatar()}
    </div>
  );
};

// Styles
const styles = {
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '20%',
    backgroundColor: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '20px',
  },
};

export default Avatar;
