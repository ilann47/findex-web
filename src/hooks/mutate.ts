import { useCallback, useMemo } from 'react'

import { MutationFunction, QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { useLoading } from './loading'
import { useToast } from './toast'
import { ENDPOINTS } from '@/constants/endpoints'
import { RequestParams, Service } from '@/service'
import { saadAPI } from '@/service/saad'
import { ErrorResponse } from '@/types/error-response'
import { Message } from '@/types/i18n'

interface Params {
	endpoint: string
	invalidateQueries?: QueryKey[]
}

interface BaseMethodParams {
	successMessage?: Message
}

interface MethodParams<P> extends BaseMethodParams {
	body: P
}

interface UpdateMethodParams<P> extends BaseMethodParams {
	body: P
	id: string | number
}

interface DeleteMethodParams extends BaseMethodParams {
	id?: string | number
	requestParams?: RequestParams
}

interface SendFileMethodParams extends BaseMethodParams {
	file: File
	fileName: string
	id: string | number
}

interface RemoveFileMethodParams extends BaseMethodParams {
	fileName: string
	id: string | number
}

export const useMutate = <T extends object, P extends object = object>({
	endpoint,
	invalidateQueries = [],
}: Params) => {
	const service = new Service<T>(saadAPI, endpoint)
	const queryClient = useQueryClient()
	const { notifySuccess, notifyError } = useToast()
	const { startLoading, stopLoading } = useLoading()

	const onSuccess = useCallback(
		(_: unknown, { successMessage }: BaseMethodParams) => {
			queryClient.invalidateQueries({ queryKey: [endpoint] })

			for (const key of invalidateQueries) queryClient.invalidateQueries({ queryKey: key })

			successMessage && notifySuccess(successMessage)
		},
		[invalidateQueries]
	)

	const onError = useCallback((error: AxiosError<ErrorResponse>) => {
		stopLoading()
		const message = error.response?.data.message
		notifyError(
			message ? { id: 'message.request.api-error', values: { message: message } } : 'message.request.error'
		)
	}, [])

	const createMutationFn: MutationFunction<AxiosResponse<T>, MethodParams<P>> = async ({ body }) => {
		startLoading()
		const result = await service.create(body)
		stopLoading()

		return result
	}

	const { mutateAsync: create, isPending: isLoadingCreate } = useMutation({
		mutationFn: createMutationFn,
		onSuccess,
		onError,
	})

	const patchMutationFn: MutationFunction<AxiosResponse<T>, MethodParams<P>> = async ({ body }) => {
		startLoading()
		const result = await service.patch(body)
		stopLoading()

		return result
	}

	const { mutateAsync: patch, isPending: isLoadingPatch } = useMutation({
		mutationFn: patchMutationFn,
		onSuccess,
		onError,
	})

	const updateMutationFn: MutationFunction<AxiosResponse<T>, UpdateMethodParams<P>> = async ({ body, id }) => {
		startLoading()
		const result = await service.update(id, body)
		stopLoading()

		return result
	}

	const { mutateAsync: update, isPending: isLoadingUpdate } = useMutation({
		mutationFn: updateMutationFn,
		onSuccess,
		onError,
	})

	const removeMutationFn: MutationFunction<void, DeleteMethodParams> = async ({ id, requestParams }) => {
		startLoading()
		await service.delete(id, undefined, requestParams)
		stopLoading()
	}

	const { mutateAsync: remove, isPending: isLoadingRemove } = useMutation({
		mutationFn: removeMutationFn,
		onSuccess,
		onError,
	})

	const sendFileMutationFn: MutationFunction<Blob, SendFileMethodParams> = ({
		file,
		fileName,
		id,
	}: SendFileMethodParams) => {
		startLoading()
		const formData = new FormData()
		formData.append(fileName, file)

		const result = service.sendFile(formData, {}, `${endpoint}/${id}/${fileName}`)
		stopLoading()

		return result
	}

	const { mutateAsync: sendFile, isPending: isLoadingSendFile } = useMutation({
		mutationFn: sendFileMutationFn,
		onSuccess,
		onError,
	})

	const removeFileMutationFn: MutationFunction<void, RemoveFileMethodParams> = async ({ id, fileName }) => {
		startLoading()
		await service.delete(id, `${endpoint}/${id}/${fileName}`)
		stopLoading()
	}

	const { mutateAsync: removeFile, isPending: isLoadingRemoveFile } = useMutation({
		mutationFn: removeFileMutationFn,
		onSuccess,
		onError,
	})

	const isLoading = useMemo(
		() =>
			isLoadingCreate ||
			isLoadingUpdate ||
			isLoadingPatch ||
			isLoadingRemove ||
			isLoadingSendFile ||
			isLoadingRemoveFile,
		[isLoadingCreate, isLoadingUpdate, isLoadingPatch, isLoadingRemove, isLoadingSendFile, isLoadingRemoveFile]
	)

	return {
		create,
		update,
		patch,
		sendFile,
		removeFile,
		remove,
		isLoading,
	}
}

export const useAuthMutate = <T extends object, P extends object = object>({ endpoint, invalidateQueries }: Params) => {
	return useMutate<T, P>({
		endpoint: `${ENDPOINTS.AUTH}/${endpoint}`,
		invalidateQueries: invalidateQueries?.map((query) => query.map((val) => `${ENDPOINTS.AUTH}/${val}`)),
	})
}
