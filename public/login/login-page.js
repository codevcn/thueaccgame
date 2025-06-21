import { AuthService } from "../services/auth-service.js"
import { AxiosErrorHandler, AppLoadingHelper, RouterHelper, Toaster } from "../utils/helpers.js"

class LoginPageManager {
  constructor() {
    this.passwordInput = document.getElementById("password-input")
    this.usernameInput = document.getElementById("username-input")
    this.togglePasswordBtn = document.getElementById("toggle-password-btn")
    this.eyeOpenedIcon = document.getElementById("eye-opened-icon")
    this.eyeClosedIcon = document.getElementById("eye-closed-icon")

    this.isPasswordVisible = false

    this.togglePasswordBtn.addEventListener("click", () => this.togglePasswordVisibility())

    document.getElementById("login-form").addEventListener("submit", this.loginHandler.bind(this))
  }

  togglePasswordVisibility() {
    if (this.isPasswordVisible) {
      this.passwordInput.type = "password"
      this.eyeOpenedIcon.hidden = true
      this.eyeClosedIcon.hidden = false
    } else {
      this.passwordInput.type = "text"
      this.eyeOpenedIcon.hidden = false
      this.eyeClosedIcon.hidden = true
    }
    this.isPasswordVisible = !this.isPasswordVisible
  }

  validateFormData() {
    const username = this.usernameInput.value
    const password = this.passwordInput.value
    if (username === "") {
      return null
    }
    if (password === "" && password.length < 6) {
      return null
    }
    return {
      username,
      password,
    }
  }

  loginHandler(e) {
    e.preventDefault()

    const formData = this.validateFormData()
    if (!formData) return

    AppLoadingHelper.show()
    AuthService.login(formData.username, formData.password)
      .then((res) => {
        RouterHelper.pureNavigator("/")
      })
      .catch((err) => {
        Toaster.error("Lỗi đăng nhập", AxiosErrorHandler.handleHTTPError(err).message)
      })
      .finally(() => {
        AppLoadingHelper.hide()
      })
  }
}

new LoginPageManager()
