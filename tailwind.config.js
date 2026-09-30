/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 1. Surface (Latar Belakang & Wadah)
        surface: {
          app: "#F8FAFC",       // Latar utama halaman (Slate-50)
          card: "#FFFFFF",      // Latar kartu, tabel, dan modal (Pure White)
          header: "#F1F5F9",    // Header kolom tabel & modal header (Slate-100)
          input: "#F8FAFC",     // Latar kotak input form
          hover: "#F1F5F9",     // State saat disorot kursor (Slate-100)
          button: "#F1F5F9",    // Latar tombol sekunder (minus, batal)
        },

        // 2. Borders
        border: {
          subtle: "#E2E8F0",    // Border pemisah kartu & baris (Slate-200)
          active: "#CBD5E1",    // Border saat aktif / hover (Slate-300)
          focus: "#D97706",     // Border saat input focus (Brand)
        },

        // 3. Content (Teks & Label)
        content: {
          primary: "#0F172A",   // Teks judul & angka utama (Slate-900)
          secondary: "#475569", // Teks deskripsi & label (Slate-600)
          muted: "#94A3B8",     // Teks watermark / footer (Slate-400)
        },

        // 4. Brand / Aksen Utama
        brand: {
          DEFAULT: "#D97706",   // Warna utama aksen (Amber tegas)
          hover: "#B45309",     // State hover tombol utama
          contrast: "#FFFFFF",  // Teks di atas tombol brand
          bg: "#FEF3C7",        // Latar badge / icon brand (Amber muda)
          border: "#FDE68A",    // Border badge / icon brand
        },

        // 5. Status Indicators (Badges)
        status: {
          inStock: "#047857",       // Teks In Stock (Emerald)
          inStockBg: "#ECFDF5",     // Latar In Stock
          inStockBorder: "#A7F3D0", // Border In Stock
          
          lowStock: "#B45309",      // Teks Low Stock (Amber)
          lowStockBg: "#FEF3C7",    // Latar Low Stock
          lowStockBorder: "#FDE68A",// Border Low Stock

          outOfStock: "#BE123C",      // Teks Out of Stock (Rose)
          outOfStockBg: "#FFE4E6",    // Latar Out of Stock
          outOfStockBorder: "#FECDD3",// Border Out of Stock
        },
      },
    },
  },
  plugins: [],
}
