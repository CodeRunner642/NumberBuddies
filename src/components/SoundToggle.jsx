export default function SoundToggle({ enabled, onToggle }) {
  return (
    <button
      className="btn-sound"
      onClick={onToggle}
      aria-label={enabled ? 'Turn sound off' : 'Turn sound on'}
      title={enabled ? 'Sound on' : 'Sound off'}
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}
