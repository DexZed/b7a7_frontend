type Props<T> = {
  dataHead: T[];
  dataRows: T[][];
};

function GenericTable<T>({ dataHead, dataRows }: Props<T>) {
  const isValid = dataRows.every((row) => row.length === dataHead.length);

  if (!isValid) {
    throw new Error(
      "Each row must have the same number of fields as the headers.",
    );
  }

  return (
    <div className="glass-morphism">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {dataHead.map((head, i) => (
                <th key={i}>{String(head)}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dataRows.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => (
                  <td className="capitalize" key={j}>
                    {String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
