import { ReactNode, useCallback } from 'react'

import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import {
	Table as MuiTable,
	Stack,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material'
import { Cell, ColumnDef, flexRender } from '@tanstack/react-table'
import { Link } from 'react-router-dom'

import TableLoading from './loading/rows'
import { TablePaginationSkeleton } from './loading/skeleton/pagination'
import TableNoDataWarning from './no-data-warning'
import TableControls from './table-controls'
import TableHeader from './table-header'
import { useFormatMessage } from '@/hooks/i18n/format-message'
import { useFormatNumber } from '@/hooks/i18n/format-number'
import { usePagination } from '@/hooks/pagination'
import { useTable } from '@/hooks/table'
import { theme } from '@/theme'

export interface TableProps<T> {
	data: T[]
	dataLength: number
	columns: ColumnDef<T>[]
	isLoading?: boolean
	getRowLink?: (data: T) => string
	downloadSpreadSheet: () => void
	downloadReport: () => void
	endTableControls?: ReactNode
	getEndRowNode?: (data: T) => ReactNode
}

const Table = <T extends object>({
	data,
	columns,
	dataLength,
	isLoading,
	getRowLink,
	downloadSpreadSheet,
	downloadReport,
	endTableControls,
	getEndRowNode: getEndNode,
}: TableProps<T>) => {
	const formatMessage = useFormatMessage()
	const formatNumber = useFormatNumber()

	const formatCell = useCallback((cell: Cell<T, unknown>) => {
		if (!cell.getValue()) return '-'
		if (typeof cell.getValue() === 'number') return formatNumber(cell.getValue() as number)
		return flexRender(cell.column.columnDef.cell, cell.getContext())
	}, [])

	const { columnOrder, getHeaderGroups, getRowModel, handleChangeColumnOrder, getAllLeafColumns } = useTable(
		data,
		columns
	)

	const { rowsPerPage, page, changePage, changeRowsPerPage } = usePagination()

	const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

	const handleDragEnd = (e: DragEndEvent) => {
		handleChangeColumnOrder(e)
	}

	return (
		<Stack gap={2}>
			<TableControls
				columns={getAllLeafColumns()}
				changeOrder={handleChangeColumnOrder}
				downloadSpreadSheet={downloadSpreadSheet}
				downloadReport={downloadReport}
				disableExport={data.length === 0}
				endControls={endTableControls}
				isLoading={isLoading}
			/>
			<DndContext
				onDragEnd={handleDragEnd}
				modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
				sensors={sensors}
			>
				<TableContainer>
					<MuiTable>
						<TableHead sx={{ backgroundColor: theme.palette.juicy.neutral[30] }}>
							{getHeaderGroups().map((headerGroup) => (
								<SortableContext
									key={headerGroup.id}
									items={columnOrder}
									strategy={horizontalListSortingStrategy}
								>
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<TableHeader key={header.id} header={header} />
										))}
										{getEndNode && <TableCell sx={{ width: 0 }}></TableCell>}
									</TableRow>
								</SortableContext>
							))}
						</TableHead>

						<TableBody>
							{isLoading ? (
								<TableLoading columns={columns.length} rows={rowsPerPage} />
							) : (
								getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										component={getRowLink ? Link : TableRow}
										to={getRowLink && getRowLink(row.original)}
										sx={{ textDecoration: 'none', cursor: getRowLink ? 'pointer' : 'default' }}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} sx={{ width: cell.column.getSize() }}>
												{formatCell(cell)}
											</TableCell>
										))}
										{getEndNode && (
											<TableCell sx={{ width: 0 }}>{getEndNode(row.original)}</TableCell>
										)}
									</TableRow>
								))
							)}
						</TableBody>
					</MuiTable>

					{data.length > 0 && !isLoading && (
						<TablePagination
							component='div'
							count={dataLength}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={(_e, pageIndex) => changePage(pageIndex)}
							onRowsPerPageChange={(e) => changeRowsPerPage(Number(e.target.value))}
							labelRowsPerPage={formatMessage('table.rows-per-page')}
							labelDisplayedRows={({ from, to, count }) => {
								return `${from} a ${to} de ${count}`
							}}
							showLastButton
							showFirstButton
							rowsPerPageOptions={[5, 10, 20, 50, 100]}
						/>
					)}

					{data.length === 0 && !isLoading && !isLoading && <TableNoDataWarning />}

					{isLoading && <TablePaginationSkeleton mt={2} />}
				</TableContainer>
			</DndContext>
		</Stack>
	)
}

export default Table
