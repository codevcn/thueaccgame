import { render } from "https://esm.run/lit-html@1"

export class LitHTMLHelper {
  static getFragment(Render, data) {
    const component = Render(data)
    const fragment = document.createDocumentFragment()
    render(component, fragment)
    return fragment
  }
}

export class AxiosErrorHandler {
  static MAX_LEN_OF_ERROR_MESSAGE = 100

  static handleHTTPError(originalError) {
    let statusCode = 500 // Internal Server Error
    let message = "Unknown Error!"
    let isCanceled = false

    if (this.isAxiosError(originalError)) {
      const responseOfError = originalError.response

      if (responseOfError) {
        // if error was made by server at backend
        statusCode = responseOfError.status // update error status

        const dataOfResponse = responseOfError.data

        if (typeof dataOfResponse === "string") {
          message = "Invalid request"
        } else {
          message = dataOfResponse.message // update error message

          if (message.length > AxiosErrorHandler.MAX_LEN_OF_ERROR_MESSAGE) {
            message = `${message.slice(0, AxiosErrorHandler.MAX_LEN_OF_ERROR_MESSAGE)}...`
          }
        }
      } else if (originalError.request) {
        // The request was made but no response was received
        statusCode = 502 // Bad Gateway
        message = "Bad network or error from server."
      } else {
        // Something happened in setting up the request that triggered an Error
        message = originalError.message
      }
    } else if (originalError instanceof axios.CanceledError) {
      isCanceled = true
      message = originalError.message
    } else if (originalError instanceof Error) {
      message = originalError.message
    }

    return {
      originalError,
      statusCode,
      message,
      isCanceled,
    }
  }

  static isAxiosError(error) {
    return error instanceof axios.AxiosError
  }
}

export class Toaster {
  static success(title, message) {
    Swal.fire({
      icon: "success",
      title,
      text: message,
    })
  }

  static error(title, message) {
    Swal.fire({
      icon: "error",
      title,
      text: message,
    })
  }
}

export class RouterHelper {
  static pureNavigator(path) {
    window.location.href = path
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

export class CanvasHelper {
  static createDynamicBackground() {
    const canvas = document.getElementById("CSS-dynamic-background")
    const ctx = canvas.getContext("2d")
    let W = window.innerWidth,
      H = window.innerHeight

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener("resize", resize)
    resize()

    // --- Particle config ---
    const PARTICLE_NUM = 90
    const PARTICLE_SIZE = 1.6
    const PARTICLE_SPEED = 0.45
    const LINE_DIST = 210 // phạm vi nối các thanh
    const LINE_OPACITY = 0.13 // opacity mờ hơn

    const particles = []
    const mouse = { x: W / 2, y: H / 2 }

    // Random mạng nhện
    for (let i = 0; i < PARTICLE_NUM; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED,
      })
    }

    // Animation main
    function animate() {
      ctx.clearRect(0, 0, W, H)

      // Di chuyển và vẽ các hạt chính
      for (let i = 0; i < PARTICLE_NUM; i++) {
        let p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        // Vẽ hạt mờ hơn
        ctx.beginPath()
        ctx.arc(p.x, p.y, PARTICLE_SIZE, 0, Math.PI * 2, false)
        ctx.fillStyle = "rgba(230,240,255,0.37)"
        ctx.shadowColor = "rgba(91,212,255,0.05)"
        ctx.shadowBlur = 4
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Vẽ rất nhiều đường nối mạng nhện (gấp đôi bình thường, khoảng cách lớn hơn)
      for (let i = 0; i < PARTICLE_NUM; i++) {
        for (let j = i + 1; j < PARTICLE_NUM; j++) {
          let p1 = particles[i],
            p2 = particles[j]
          const dx = p1.x - p2.x,
            dy = p1.y - p2.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINE_DIST) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(200,220,255,${
              LINE_OPACITY - (d / LINE_DIST) * LINE_OPACITY * 0.9
            })`
            ctx.lineWidth = 1.1
            ctx.stroke()
          }
        }
      }
      requestAnimationFrame(animate)
    }
    animate()
  }
}
