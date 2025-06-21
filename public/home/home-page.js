import { AccCard } from "/utils/components.js"
import { AppLoadingHelper, AxiosErrorHandler, LitHTMLHelper, SwalHelper } from "/utils/helpers.js"
import { AccountService } from "/services/account-service.js"

class HomePageManager {
  isMoreItems = true

  constructor() {
    this.stallGrid = document.getElementById("stall-grid")
    this.infiniteScrollFlag = document.getElementById("infinite-scroll-flag")
    this.isFetchingItems = false

    this.loadMoreAccounts()

    if (this.infiniteScrollFlag) {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            this.loadMoreAccounts()
          }
        },
        {
          rootMargin: "0px 0px 5px 0px", // Load when 5px away from the flag
        }
      )
      this.observer.observe(this.infiniteScrollFlag)
    }
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
          this.showIsMoreText()
        }
      })
      .catch((error) => {
        SwalHelper.error("Error", AxiosErrorHandler.handleHTTPError(error).message)
      })
      .finally(() => {
        AppLoadingHelper.hide()
        this.isFetchingItems = false
      })
  }
}

new HomePageManager()
