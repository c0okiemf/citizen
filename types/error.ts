export type AppError =
    | undefined
    | {
          message: string
          originalError: any
      }
