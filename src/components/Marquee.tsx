const ITEMS = ["Rock & Pop", "90.7 FM", "Formosa", "Argentina"];

export function Marquee() {
  const row = (
    <div className="marquee__row">
      {ITEMS.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <span className="marquee__dot" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  );
}
