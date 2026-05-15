export default function WelcomeScreen({ onStart }) {
  return (
    <div className="screen welcome-screen">
      <div className="welcome-logo">🔢</div>
      <h1 className="app-title">Number Buddies</h1>
      <p className="welcome-text">Let's play with numbers!</p>
      <button className="btn btn-primary btn-large" onClick={onStart}>
        Start
      </button>
    </div>
  );
}
