type PopupProps = {
  children: React.ReactNode;
  active: boolean;
};

export function Popup({ children, active }: PopupProps) {
  if (!active) {
    return <></>;
  }

  return (
    <div
      className="popup-item"
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'white',
        zIndex: '1',
      }}
    >
      <div
        className="container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
