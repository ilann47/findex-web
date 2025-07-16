/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '@tanstack/react-table'
import { RowData } from '@tanstack/react-table'

import { LabelValue } from './label-value'

export type FilterType = 'text' | 'select' | 'range'

export interface BaseFilter {
	type: FilterType
	id: string
}

export interface TextFilter extends BaseFilter {
	type: 'text'
}

export interface SelectFilter extends BaseFilter {
	type: 'select'
	items: LabelValue<string | boolean>[]
	variant: 'multiple' | 'single'
	isLoading?: boolean
}

export interface RangeFilter extends BaseFilter {
	type: 'range'
	variant: 'date' | 'number'
}

export type Filter = TextFilter | SelectFilter | RangeFilter

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		filter: Filter
		name?: string
	}
}
