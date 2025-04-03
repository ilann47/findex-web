import { Skeleton, TableCell, TableRow } from '@mui/material'

interface TableLoadingProps {
	rows: number
	columns: number
}

const TableLoading = ({ rows, columns }: TableLoadingProps) => {
	return (
		<>
			{Array.from({ length: rows }).map((_, rowIndex) => (
				<TableRow key={rowIndex}>
					{Array.from({ length: columns }).map((_, colIndex) => (
						<TableCell key={colIndex}>
							<Skeleton variant='rectangular' />
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	)
}

export default TableLoading
