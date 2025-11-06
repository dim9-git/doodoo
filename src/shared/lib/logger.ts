const logger = {
  info: (message: string, meta?: object) => {
    console.log(
      JSON.stringify(
        {
          level: "info",
          timestamp: new Date().toISOString(),
          message,
          ...meta,
        },
        null,
        2
      )
    )
  },
  error: (message: string, error?: unknown, meta?: object) => {
    console.error(
      JSON.stringify(
        {
          level: "error",
          timestamp: new Date().toISOString(),
          message,
          error:
            error instanceof Error
              ? {
                  message: error.message,
                  stack: error.stack,
                }
              : error,
          ...meta,
        },
        null,
        2
      )
    )
  },
}

export default logger
