export const CONFIG = {
  // Fase 1: Lock Screen
  lockScreen: {
    question: "kita jadian tanggal berapa sii? (format: dd-mm, contoh: 14-04)",
    correctAnswers: ["14-04", "14 april", "14/04"],
    errorMessage: "salah woyyy! coba inget-inget lagi date penting kita donggg...",
    placeholder: "jawab disini ya bebee..."
  },

  // Fase 2: Gift Box (BGM is played here)
  giftBox: {
    title: "ada kado spesial buat kamu sayangg!",
    subtitle: "swipe up tutup kadonya biar kebuka cintaaa",
    audioUrl: "/assets/Nadin Amizah - Semua Aku Dirayakan (Official Lyric Video) [5UihqGaL5nM].mp3", 
    audioFallbackUrl: "/assets/Nadin Amizah - Semua Aku Dirayakan (Official Lyric Video) [5UihqGaL5nM].mp3",
  },

  // Music Player Config (now uses the girlfriend's photo!)
  musicPlayer: {
    coverUrl: "/assets/IMG-20260527-WA0009.jpg.jpeg",
  },

  // Fase 4: The Photo Album (Replaces Serenade)
  album: {
    title: "our memory lane sayangg",
    subtitle: "beberapa momen manis yang selalu aku simpannn",
    photos: [
        { url: "/assets/4934540375_127696184322037_1777630252339.png", caption: "kamuu inget tidaa sama foto inii, dimana awal awal kita bikin baju couple, terusss kamuu ajakin ke mapp inii yang menurut akuu bagus banget view nya apalagi ada kamuu tambah EGILUYYY HIDJJSIADJJJSIAJJJD hihi mwaa lovveuuu" },
        { url: "/assets/RobloxScreenShot20250518_155050642.png", caption: "kamuuu inget tidaa pas awal awal kitaa aga dekett, dimana kamu pinjem golden butterfly akuu, akuu ajarin moon melon method" },
        { url: "/assets/IMG-20260602-WA0003.jpg.jpeg", caption: "HIIHHHDSAHDSAIDHSAD CANTIKKK BANGETT SIII HEEII CEWE CIAPAA NIIII, JELASSS CEWE GUAAA" },
        { url: "/assets/IMG-20260613-WA0055.jpg.jpeg", caption: "semogaaa kita terus bareng bareng yaa sayangg di segala kondisiii walauppunn akuu sedang adaa masalah atau kamuu sebaliknyaa, kita saling support yaaa" }
      ],
    buttonText: "buka surat cintaaa"
  },

  // Fase 3: Flower Garden
  garden: {
    title: "our secret garden bebee",
    subtitle: "tap kuncup bunganya satu-satu buat liat hidden message-nya yaaa",
    flowers: [
      { id: 1, name: "mawar merah", color: "from-rose-400 to-red-600", message: "aku pilih mawar merah karena bunga ini lambang cinta yang dalam dan tahan lama, kayak perasaan aku ke kamu juga gak pernah pudar, cuma makin dalam setiap hari! 💖" },
      { id: 2, name: "tulip pink", color: "from-pink-400 to-rose-500", message: "tulip pink mewakili kebahagiaan dan cinta manis, sama kayak kamu yang selalu bikin hari-hari aku berwarna cerah dan penuh senyum! 🌷" },
      { id: 3, name: "matahari", color: "from-yellow-400 to-amber-500", message: "bunga matahari selalu menghadap matahari, kamu selalu menghadap kebaikan, kamu bikin aku semangat dan merasa hangat setiap saat! ☀️" },
      { id: 4, name: "lavender", color: "from-purple-400 to-indigo-500", message: "lavender buat ketenangan, kamu selalu buat aku tenang dan nyaman, sama kayak aroma lavender yang bikin orang tidur nyenyak! 💜" },
      { id: 5, name: "lily putih", color: "from-slate-100 to-pink-200", message: "lily putih mewakili kesucian dan keindahan, sama kayak kamu yang selalu terlihat sempurna di mata aku, cantik dari dalam maupun luar! 🤍" }
    ],
    buttonText: "next surprise donggg"
  },

  // Fase 5: Scratch Card
  scratchCard: {
    title: "scratch this card bebee",
    subtitle: "gosok layarnya pake jari buat baca surat cintaaa dari aku",
    letterText: `happy birthday to my fav person in this entire universe, bener-bener ganyangka udah sejauh ini bareng kamu. thank you for being you, for existing, and for making my world so much brighter just by being in it. i swear, every single moment with you feels like a dream i never wanna wake up from, you’re literally my home and my safe place. im so lucky to have you, i hope u know that i’ll always choose you over and over again, in every lifetime, no matter what happens.

happy birthday bebe, i wishing you all the happiness this world has 2 offer! i hope ur day is as special as ur heart, you really deserve the whole world and more. jangan pernah berubah ya, tetap jadi sosok yang selalu bikin gue ayuk bgt setiap harinya. i hope u love everything ive prepared 4 u, karena semuanya spesial dibuat cuma buat kamu. stay my favorite human forever, okay? i love u 3000.

today is all about celebrating the most beautiful soul i’ve ever known, aka you! makasih udah selalu sabar sama gue, udah selalu dengerin cerita gue, dan selalu ada pas gue lagi bener-bener capek sama dunia. you are the definition of "home" to me, and i don’t know what i’d do without you by my side. semoga hari ini dan hari-hari kedepannya penuh sama tawa, kebahagiaan, dan segala hal baik yang emang pantas kamu dapetin, sayangg.

aaaak gak kerasa udah nambah umur ajaa, time flies so fast! bener-bener gak bisa ungkapin betapa blessed-nya gue rasa bisa ada aja di hidup kamu. you are the prettiest thing ive ever seen, not just outside but your whole personality is just mwahh. thank you for being my person, my partner in crime, and my best friend. lets make another year full of beautiful memories, just me and you, dealing with everything together, cintaa.

last but not least, happy birthday again to my one and only. moga tahun ini jadi tahun yang paling indah buat kamu, semua goals yang kamu pengenin bisa kecapai, dan kamu selalu jadi versi diri kamu yang paling happy. i love you more than words could ever describe, and i’m so excited to celebrate more birthdays with you. enjoy ur day to the fullest, my everything, maiiloppp, love you so much!!`
  },

  // Fase 6: Direct Message (WhatsApp Form)
  directMessage: {
    title: "send your love sayangg",
    subtitle: "tulis feedback atau wishes kamu terus kirim langsung ke wa aku yaa bebee!",
    whatsappNumber: "6285731593391",
    defaultTemplate: "hai! makasih banyak bangett buat surprise web-nya, gemes bangett! wishes aku di umur baru ini tuhh..."
  }
};