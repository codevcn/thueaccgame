import { html } from "https://esm.run/lit-html@1"

export const AccCard = (item) => {
  const avatar =
    item.avatar.length <= 2
      ? html`<div
          class="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-lg"
        >
          ${item.avatar}
        </div>`
      : html`<img src="${item.avatar}" alt="seller" class="w-10 h-10 rounded-full object-cover" />`

  return html`
    <div
      class="bg-regular-gray-cl rounded-lg p-4 flex flex-col justify-between gap-4 border border-transparent hover:border-gray-500 hover:-translate-y-2 transition duration-300"
    >
      <div>
        <h3 class="text-white font-semibold mb-3 h-[40px] text-sm overflow-hidden">
          ${item.title}
        </h3>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="bg-[#3c3c3c] text-gray-300 text-xs font-medium px-2.5 py-1 rounded-md"
              >Min. 1</span
            >
            <span class="bg-[#3c3c3c] text-gray-300 text-xs font-medium px-2.5 py-1 rounded-md"
              >1</span
            >
            <span
              class="flex items-center gap-1 bg-[#3c3c3c] text-gray-300 text-xs font-medium pl-2 pr-2.5 py-1 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
              5 hrs
            </span>
          </div>
          <div class="text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-gray-700/50">
        <div>
          <div class="flex items-center gap-3">
            ${avatar}
            <div>
              <p class="font-semibold text-sm">${item.seller}</p>
              <p class="text-gray-400 text-xs">Level ${item.level}</p>
            </div>
          </div>
          <div class="text-right mt-1">
            <p class="font-bold text-lg text-white">${item.price}</p>
            <p class="text-gray-400 text-xs">VND</p>
          </div>
        </div>
        <button class="CSS-button-blue-decoration py-1.5 mt-2">Thuê ngay</button>
      </div>
    </div>
  `
}
