/**
 * Artify Sols Backend — Standardized API Response & Error Layer
 */

import { Request, Response } from 'express';
import crypto from 'crypto';

export enum ApiErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_CONFLICT = 'RESOURCE_CONFLICT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  AI_EXECUTION_ERROR = 'AI_EXECUTION_ERROR',
  AI_APPROVAL_REQUIRED = 'AI_APPROVAL_REQUIRED',
  INSUFFICIENT_QUOTA = 'INSUFFICIENT_QUOTA',
  TENANT_ISOLATION_ERROR = 'TENANT_ISOLATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: ApiErrorCode | string;
    message: string;
    details?: any;
    requestId: string;
  };
  meta?: {
    requestId: string;
    timestamp: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export function getRequestId(req: Request): string {
  if (!req.headers['x-request-id']) {
    req.headers['x-request-id'] = `req_${crypto.randomBytes(8).toString('hex')}`;
  }
  return req.headers['x-request-id'] as string;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  pagination?: { page: number; limit: number; total: number }
): void {
  const req = res.req as Request;
  const requestId = getRequestId(req);

  const responsePayload: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      requestId,
      timestamp: new Date().toISOString(),
      pagination: pagination
        ? {
            page: pagination.page,
            limit: pagination.limit,
            total: pagination.total,
            totalPages: Math.ceil(pagination.total / pagination.limit),
          }
        : undefined,
    },
  };

  res.status(statusCode).json(responsePayload);
}

export function sendError(
  res: Response,
  statusCode: number,
  code: ApiErrorCode | string,
  message: string,
  details?: any
): void {
  const req = res.req as Request;
  const requestId = getRequestId(req);

  const responsePayload: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      details,
      requestId,
    },
    meta: {
      requestId,
      timestamp: new Date().toISOString(),
    },
  };

  res.status(statusCode).json(responsePayload);
}
