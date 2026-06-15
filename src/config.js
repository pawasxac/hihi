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
    letterText: `happy birthday ya sayangg! jujur aku bener-bener bersyukur banget punya kamu di hidup aku. kamu tuh orang paling random yang aku temuin tapi somehow selalu bisa bikin hari aku lebih bagus. gila sih, kamu udah berarti banget buat aku sekarangww.\n\ndi umur yang baru ini, semoga kamu dapetin semua hal baik yang kamu pantas bangett. tetep sehat, jangan overthinking mulu, dan semoga semua urusan kamu dilancarin semua ya. apapun yang terjadi, aku bakal selalu disini buat kamu, for real!\n\nmakasih ya udah jadi kamu, jangan pernah berubah donggg. kita udah melalui banyak hal bareng-bareng dan aku siap buat bikin lebih banyak lagi memori sama kamu. selamat hari spesial kamu sayangg, have funn yaaa cintaaa!`
  },

  // Fase 6: Direct Message (WhatsApp Form)
  directMessage: {
    title: "send your love sayangg",
    subtitle: "tulis feedback atau wishes kamu terus kirim langsung ke wa aku yaa bebee!",
    whatsappNumber: "6285731593391",
    defaultTemplate: "hai! makasih banyak bangett buat surprise web-nya, gemes bangett! wishes aku di umur baru ini tuhh..."
  }
};