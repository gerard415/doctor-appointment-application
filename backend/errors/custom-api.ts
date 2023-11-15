class CustomAPIError extends Error {
    constructor(message: string | undefined) {
      super(message)
    }
  }
  
export = CustomAPIError