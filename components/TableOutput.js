export default function TableSQL({ columns, values }) {
  return (
    <>
      <div className="overflow-auto">
        <table className="w-full table-auto border-2 border-secondary-100 text-left">
          <thead className="bg-secondary-100 font-head text-sm uppercase text-white">
            <tr>
              {columns.map((column, index) => (
                <th key={index} scope="col" className="p-1.5">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-slate-50 font-body text-sm text-gray-600">
            {values.map((rows, index) => (
              <tr className="border-b-2 border-secondary-100" key={index}>
                {rows.map((value, index) => (
                  <td className="px-1.5 py-0.5" key={index}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
