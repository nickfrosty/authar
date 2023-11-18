/***/

/**
 *
 */
export type ApiAction = {
  apiAction: "delete" | "update" | "new";
  /** helper to transfer the working elements final index position */
  finalIndex?: number;
};

/**
 * Wrapper type to add type safe API actions to key on
 */
export type WithApiAction<T> = T & ApiAction;

/**
 * Base type for success responses from the api
 */
export type ApiSuccessResponse<T> = {
  /**
   * Simple success status of the response
   */
  success: boolean;

  /**
   * Simple status message
   */
  msg: string;

  /**
   * Data payload for the success response
   */
  data: T;
};

/**
 * Base type for error responses from the api
 */
export type ApiErrorResponse = {
  /**
   * HTTP status code returned
   */
  statusCode: number;

  /**
   * Error status message
   */
  error: { msg: string; field?: string };
};
