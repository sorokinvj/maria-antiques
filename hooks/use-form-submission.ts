// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react'

function submissionReducer(state: any, action: any) {
  switch (action.type) {
    case 'ERROR':
      return { ...state, status: 'error', ...action.payload }
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
      message: null
    }
  )

  const submissionError = submissionState.status === 'error'
  const submissionLoading = submissionState.status === 'loading'
  const submissionSuccess = submissionState.status === 'success'

  const setSubmissionError = (message = 'Error') =>
    submissionDispatch({
      type: 'ERROR',
      payload: { message }
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
