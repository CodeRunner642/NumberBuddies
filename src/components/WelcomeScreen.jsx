export default function WelcomeScreen({ onStart }) {
  return (
    <div className="screen welcome-screen">
      <div className="welcome-logo">🔢</div>
      <h1 className="app-title">
        Number <span className="app-title-accent">Buddies</span>
      </h1>
      <p className="welcome-text">Let&rsquo;s play with numbers!</p>
      <button className="btn btn-primary btn-large" onClick={onStart}>
        Start
      </button>
    </div>
  );
}
