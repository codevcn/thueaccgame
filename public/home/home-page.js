import { AccCard } from "/utils/components.js"
import { AppLoadingHelper, AxiosErrorHandler, LitHTMLHelper, Toaster } from "/utils/helpers.js"
import { AccountService } from "/services/account-service.js"

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
  }

  showIsMoreText() {
    const noMoreText = document.getElementById("no-more-text")
    if (noMoreText) {
      noMoreText.hidden = false
    }
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
