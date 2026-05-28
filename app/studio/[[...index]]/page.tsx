export default function StudioPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '600px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Sanity Studio</h1>

        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
          Use the command below to open Sanity Studio locally:
        </p>

        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          fontFamily: 'monospace',
        }}>
          <p style={{ margin: 0, fontSize: '1rem', wordBreak: 'break-all' }}>
            npx sanity studio
          </p>
        </div>

        <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '2rem' }}>
          This will open Sanity Studio at <strong>http://localhost:3333</strong>
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '2rem',
          fontSize: '0.9rem',
        }}>
          <p><strong>📝 Content Types Available:</strong></p>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>✓ News Articles</li>
            <li>✓ Events</li>
            <li>✓ Publications & Articles</li>
            <li>✓ Team Members</li>
            <li>✓ Galleries</li>
            <li>✓ Resources</li>
            <li>✓ Partners</li>
            <li>✓ Testimonials</li>
          </ul>
        </div>

        <p style={{ fontSize: '0.85rem', marginTop: '2rem', opacity: 0.7 }}>
          Run this from your project directory to manage your content
        </p>
      </div>
    </div>
  )
}
