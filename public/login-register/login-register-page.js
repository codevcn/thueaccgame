import { AuthService } from "../services/auth-service.js"
import { AxiosErrorHandler, AppLoadingHelper, RouterHelper, Toaster } from "../utils/helpers.js"

class RegisterPageManager {
  constructor() {
    this.registerForm = document.getElementById("register-form")
    this.passwordInput = document.getElementById("register-password-input")
    this.confirmPasswordInput = document.getElementById("register-confirm-password-input")
    this.usernameInput = document.getElementById("register-username-input")
    this.togglePasswordBtn = document.getElementById("register-toggle-password-btn")
    this.toggleConfirmPasswordBtn = document.getElementById("register-toggle-confirm-password-btn")

    this.isPasswordVisible = false
    this.isConfirmPasswordVisible = false

    this.togglePasswordBtn.addEventListener("click", this.togglePasswordVisibility.bind(this))
    this.toggleConfirmPasswordBtn.addEventListener(
      "click",
      this.toggleConfirmPasswordVisibility.bind(this)
    )

    this.registerForm.addEventListener("submit", this.registerHandler.bind(this))
  }

  toggleConfirmPasswordVisibility() {
    if (this.isConfirmPasswordVisible) {
      this.confirmPasswordInput.type = "password"
      this.toggleConfirmPasswordBtn.querySelector(".QUERY-eye-opened-icon").hidden = true
      this.toggleConfirmPasswordBtn.querySelector(".QUERY-eye-closed-icon").hidden = false
    } else {
      this.confirmPasswordInput.type = "text"
      this.toggleConfirmPasswordBtn.querySelector(".QUERY-eye-opened-icon").hidden = false
      this.toggleConfirmPasswordBtn.querySelector(".QUERY-eye-closed-icon").hidden = true
    }
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible
  }

  togglePasswordVisibility() {
    if (this.isPasswordVisible) {
      this.passwordInput.type = "password"
      this.togglePasswordBtn.querySelector(".QUERY-eye-opened-icon").hidden = true
      this.togglePasswordBtn.querySelector(".QUERY-eye-closed-icon").hidden = false
    } else {
      this.passwordInput.type = "text"
      this.togglePasswordBtn.querySelector(".QUERY-eye-opened-icon").hidden = false
      this.togglePasswordBtn.querySelector(".QUERY-eye-closed-icon").hidden = true
    }
    this.isPasswordVisible = !this.isPasswordVisible
  }

  validateFormData() {
    const username = this.usernameInput.value
    const password = this.passwordInput.value
    const confirmPassword = this.confirmPasswordInput.value
    if (username === "") {
      Toaster.error("Lỗi đăng ký", "Tên đăng nhập không được để trống")
      return null
    }
    if (password === "" && password.length < 6) {
      Toaster.error("Lỗi đăng ký", "Mật khẩu không được để trống và phải có ít nhất 6 ký tự")
      return null
    }
    if (password !== confirmPassword) {
      Toaster.error("Lỗi đăng ký", "Mật khẩu không khớp")
      return null
    }
    return {
      username,
      password,
    }
  }

  registerHandler(e) {
    e.preventDefault()

    const formData = this.validateFormData()
    if (!formData) return

    AppLoadingHelper.show()
    AuthService.register(formData.username, formData.password)
      .then((res) => {
        RouterHelper.pureNavigator("/")
      })
      .catch((err) => {
        Toaster.error("Lỗi đăng ký", AxiosErrorHandler.handleHTTPError(err).message)
      })
      .finally(() => {
        AppLoadingHelper.hide()
      })
  }
}

class LoginPageManager {
  constructor() {
    this.loginForm = document.getElementById("login-form")
    this.passwordInput = document.getElementById("login-password-input")
    this.usernameInput = document.getElementById("login-username-input")
    this.togglePasswordBtn = document.getElementById("login-toggle-password-btn")

    this.isPasswordVisible = false

    this.togglePasswordBtn.addEventListener("click", this.togglePasswordVisibility.bind(this))

    this.loginForm.addEventListener("submit", this.loginHandler.bind(this))
  }

  togglePasswordVisibility() {
    if (this.isPasswordVisible) {
      this.passwordInput.type = "password"
      this.togglePasswordBtn.querySelector(".QUERY-eye-opened-icon").hidden = true
      this.togglePasswordBtn.querySelector(".QUERY-eye-closed-icon").hidden = false
    } else {
      this.passwordInput.type = "text"
      this.togglePasswordBtn.querySelector(".QUERY-eye-opened-icon").hidden = false
      this.togglePasswordBtn.querySelector(".QUERY-eye-closed-icon").hidden = true
    }
    this.isPasswordVisible = !this.isPasswordVisible
  }

  validateFormData() {
    const username = this.usernameInput.value
    const password = this.passwordInput.value
    if (username === "") {  
      Toaster.error("Lỗi đăng nhập", "Tên đăng nhập không được để trống")
      return null
    }
    if (password === "" && password.length < 6) {
      Toaster.error("Lỗi đăng nhập", "Mật khẩu không được để trống và phải có ít nhất 6 ký tự")
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

class SwitchFormManager {
  constructor() {
    this.loginForm = document.getElementById("login-form")
    this.registerForm = document.getElementById("register-form")
    this.loginFormSwitcher = document.getElementById("login-form-switcher")
    this.registerFormSwitcher = document.getElementById("register-form-switcher")

    this.loginFormSwitcher.addEventListener("click", this.switchFormHandler.bind(this))
    this.registerFormSwitcher.addEventListener("click", this.switchFormHandler.bind(this))
  }

  switchFormHandler() {
    if (this.loginForm.hidden || this.loginForm.hidden === "true") {
      this.loginForm.hidden = false
      this.registerForm.hidden = true
    } else {
      this.loginForm.hidden = true
      this.registerForm.hidden = false
    }
  }
}

new LoginPageManager()
new RegisterPageManager()
new SwitchFormManager()
