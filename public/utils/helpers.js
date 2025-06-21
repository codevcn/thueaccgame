import { render } from "https://esm.run/lit-html@1"
import { HTTP_STATUS } from "./contants.js"

export class LitHTMLHelper {
  static getFragment(Render, data) {
    const component = Render(data)
    const fragment = document.createDocumentFragment()
    render(component, fragment)
    return fragment
  }
}

export class AppLoadingHelper {
  static show() {
    const appLoading = document.getElementById("app-loading")
    appLoading.hidden = false
  }

  static hide() {
    const appLoading = document.getElementById("app-loading")
    appLoading.hidden = true
  }
}

export class AxiosErrorHandler {
  static handleHTTPError(originalError, defaultMessage = "Data requirement failed...") {
    const error = {
      httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: defaultMessage,
      originalError,
    }
    const responseOfError = originalError.response
    //if error was made by server at backend
    if (responseOfError) {
      error.httpStatus = responseOfError.status //update error status
      const dataOfResponse = responseOfError.data
      if (typeof dataOfResponse === "string") {
        error.message = dataOfResponse
      } else {
        error.message = dataOfResponse.message //update error message
      }
    } else if (error.originalError.request) {
      //The request was made but no response was received
      error.httpStatus = HTTP_STATUS.BAD_GATEWAY
      error.message = "Bad network or error"
    } else {
      //Something happened in setting up the request that triggered an Error
    }
    return error
  }
}

export class SwalHelper {
  static success(title, message) {
    Swal.fire({
      timer: 3000,
      icon: "success",
      title,
      text: message,
    })
  }

  static error(title, message) {
    Swal.fire({
      timer: 3000,
      icon: "error",
      title,
      text: message,
    })
  }
}
