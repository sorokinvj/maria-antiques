import React from 'react'

interface SubmissionState {
  status: string | null
  message: string | null
  error: unknown
}

interface Action {
  type: 'ERROR' | 'LOADING' | 'SUCCESS'
  payload: {
    message?: string
    error?: unknown | null
  }
}

function submissionReducer(
  state: SubmissionState,
  action: Action
): SubmissionState {
  switch (action.type) {
    case 'ERROR':
      return { ...state, status: 'error', error: action.payload?.error }
    case 'LOADING':
      return { ...state, status: 'loading', ...action.payload }
    case 'SUCCESS':
      return { ...state, status: 'success', ...action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function useSubmissionState() {
  const [submissionState, submissionDispatch] = React.useReducer(
    submissionReducer,
    {
      status: null,
      message: null,
      error: undefined
    }
  )

  const submissionLoading = submissionState.status === 'loading'
  const submissionSuccess = submissionState.status === 'success'
  const submissionError = submissionState.error

  const setSubmissionError = (error: unknown) =>
    submissionDispatch({
      type: 'ERROR',
      payload: { error }
    })

  const setSubmissionLoading = (message = 'Loading') =>
    submissionDispatch({
      type: 'LOADING',
      payload: { message }
    })

  const setSubmissionSuccess = (message = 'Success') =>
    submissionDispatch({
      type: 'SUCCESS',
      payload: { message }
    })

  return {
    submissionError,
    submissionLoading,
    submissionState,
    submissionSuccess,
    setSubmissionError,
    setSubmissionLoading,
    setSubmissionSuccess
  }
}

export default useSubmissionState
