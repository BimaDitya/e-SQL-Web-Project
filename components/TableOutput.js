export default function TableSQL({ columns, values }) {
	return (
		<>
			<div className="overflow-auto">
				<table className="table-auto w-full text-left border-2 border-secondary-100">
					<thead className="font-head uppercase bg-secondary-100 text-white">
						<tr>
							{columns.map((column, index) => (
								<th key={index} scope="col" className="px-2 py-2">
									{column}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="font-body bg-slate-50 text-gray-500">
						{
							values.map((rows, index) => (
								<tr className="border-b-2 border-secondary-100" key={index}>
									{rows.map((value, index) => (
										<td className="px-2 py-2" key={index}>{value}</td>
									))}
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</>
	);
}
