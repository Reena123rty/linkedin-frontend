export default function FeedLayout({ left, center, right }) {
  return (
    <div style={{
      maxWidth: "1150px",
      margin: "auto",
      display: "flex",
      gap: "20px",
      paddingTop: "80px"
    }}>
      <div>{left}</div>
      <div style={{ flex: 1 }}>{center}</div>
      <div>{right}</div>
    </div>
  );
}
