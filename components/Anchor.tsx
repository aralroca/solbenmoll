function Anchor({ id, top = -50 }) {
  return <div id={id} style={{ position: 'absolute', top }} />
}

export function AnchorWrapper({ children }) {
  return <div style={{ position: 'relative' }}>{children}</div>
}

export default Anchor
