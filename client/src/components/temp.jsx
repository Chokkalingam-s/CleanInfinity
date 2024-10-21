export default function Temp() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{
        width: 390,
        height: 508,
        left: 0,
        top: 0,
        position: 'absolute',
        background: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        border: '1px #2E8DAB solid',
      }} />
      <div style={{
        left: 22,
        top: 42,
        position: 'absolute',
        color: 'black',
        fontSize: 25,
        fontFamily: 'ABeeZee',
        fontStyle: 'italic',
        fontWeight: '400',
        wordWrap: 'break-word',
      }}>Getting Started</div>
      <div style={{
        left: 22,
        top: 86,
        position: 'absolute',
        color: '#979797',
        fontSize: 12,
        fontFamily: 'SF Pro Display',
        fontWeight: '700',
        wordWrap: 'break-word',
      }}>Lets login for Explore continues</div>
      <div style={{
        width: 304,
        height: 43,
        left: 43,
        top: 123,
        position: 'absolute',
        background: '#BBBBBB',
        borderRadius: 50,
      }} />
      <div style={{
        width: 304,
        height: 43,
        left: 43,
        top: 189,
        position: 'absolute',
        background: '#BBBBBB',
        borderRadius: 50,
      }} />
      <div style={{
        width: 304,
        height: 43,
        left: 43,
        top: 258,
        position: 'absolute',
        background: '#0094FF',
        borderRadius: 50,
      }} />
      <div style={{
        left: 90,
        top: 136,
        position: 'absolute',
        color: '#5E5555',
        fontSize: 14,
        fontFamily: 'SF Pro Display',
        fontWeight: '700',
        wordWrap: 'break-word',
      }}>E-mail</div>
      <div style={{
        left: 90,
        top: 202,
        position: 'absolute',
        color: '#5E5555',
        fontSize: 14,
        fontFamily: 'SF Pro Display',
        fontWeight: '700',
        wordWrap: 'break-word',
      }}>Password</div>
      <img style={{ width: 24, height: 24, left: 55, top: 133, position: 'absolute' }} src="https://via.placeholder.com/24x24" alt="Email Icon" />
      <img style={{ width: 24, height: 24, left: 55, top: 199, position: 'absolute' }} src="https://via.placeholder.com/24x24" alt="Password Icon" />
      <div style={{
        left: 167,
        top: 269,
        position: 'absolute',
        color: 'white',
        fontSize: 18,
        fontFamily: 'SF Pro Display',
        fontWeight: '700',
        wordWrap: 'break-word',
      }}>Sign In</div>
      <div style={{ width: 265, height: 16, left: 62, top: 324, position: 'absolute' }}>
        <span style={{
          color: 'black',
          fontSize: 14,
          fontFamily: 'SF Pro Display',
          fontWeight: '700',
          wordWrap: 'break-word',
        }}>Forgetton your password.</span>
        <span style={{
          color: '#0066CC',
          fontSize: 14,
          fontFamily: 'SF Pro Display',
          fontWeight: '700',
          wordWrap: 'break-word',
        }}> Reset Password</span>
      </div>
      <div style={{
        left: 142,
        top: 363,
        position: 'absolute',
        color: 'black',
        fontSize: 14,
        fontFamily: 'SF Pro Display',
        fontWeight: '700',
        wordWrap: 'break-word',
      }}>Or continue with</div>
      <div style={{
        width: 66,
        height: 0,
        left: 251,
        top: 372,
        position: 'absolute',
        border: '1px black solid',
      }} />
    </div>
  )
}
