interface Props {
  headers: string[];
  items: any[][];
}

export default function (props: Props) {
  return (
    <table className="w-full whitespace-nowrap">
      <thead>
        <tr className="border-t border-b border-gray-200">
          {props.headers.map((item) => (
            <th
              key={item}
              className="p-3 font-normal uppercase px-5 text-sm text-left"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.items.length <= 0 && (
          <tr className="border-t border-b border-gray-200">
            <td
              className="p-3 px-5 text-center text-sm"
              colSpan={props.headers.length}
            >
              Data tidak tersedia
            </td>
          </tr>
        )}
        {props.items.map((items, i) => (
          <tr
            className="border-t border-b border-gray-200 transition"
            key={"tr-" + i}
          >
            {items.map((item, j) => (
              <td key={"td-" + i + j} className="p-3 px-5 text-left text-sm">
                {item}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
