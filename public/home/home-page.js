import { AccCard, showModal, hideModal } from "../utils/components.js"
import { AppLoadingHelper, AxiosErrorHandler, LitHTMLHelper, Toaster } from "../utils/helpers.js"
import { AccountService } from "../services/account-service.js"

class HomePageManager {
  isMoreItems = true

  constructor() {
    this.stallGrid = document.getElementById("stall-grid")
    this.infiniteScrollFlag = document.getElementById("infinite-scroll-flag")
    this.loadMoreBtn = document.getElementById("load-more-btn")
    this.loadMoreContainer = document.getElementById("load-more-container")
    this.isFetchingItems = false

    this.loadMoreAccounts()

    this.loadMoreBtn.addEventListener("click", () => {
      this.loadMoreAccounts()
    })

    // Add close modal listener
    const closeModalBtn = document.getElementById("close-modal-btn")
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", () => {
        hideModal("rent-now-modal")
      })
    }
  }

  showIsMoreText() {
    const noMoreText = document.getElementById("no-more-text")
    if (noMoreText) {
      noMoreText.hidden = false
    }
  }

  // Add event listeners to rent now buttons
  addRentNowListeners() {
    const rentButtons = document.querySelectorAll('.rent-now-btn')
    rentButtons.forEach(button => {
      // Remove existing listeners to prevent duplicates
      button.removeEventListener('click', this.handleRentNowClick)
      // Add new listener
      button.addEventListener('click', this.handleRentNowClick)
    })
  }

  handleRentNowClick = (event) => {
    const itemId = event.target.getAttribute('data-item-id')
    showModal('rent-now-modal')
  }

  async loadMoreAccounts() {
    if (this.isFetchingItems || !this.isMoreItems) return
    this.isFetchingItems = true

    AppLoadingHelper.show()

    AccountService.fetchItems()
      .then((items) => {
        if (items && items.length > 0) {
          for (const item of items) {
            const fragment = LitHTMLHelper.getFragment(AccCard, item)
            this.stallGrid.appendChild(fragment)
          }
          // Add event listeners after rendering new items
          this.addRentNowListeners()
        } else {
          this.isMoreItems = false
          this.loadMoreContainer.hidden = true
          this.showIsMoreText()
        }
      })
      .catch((error) => {
        Toaster.error("Error", AxiosErrorHandler.handleHTTPError(error).message)
      })
      .finally(() => {
        AppLoadingHelper.hide()
        this.isFetchingItems = false
      })
  }
}

new HomePageManager()
