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
        { url: "/assets/4934540375_127696184322037_1777630252339.png", caption: "kamu yang selalu cantikk bangett dalam segala kondisi sayanggg" },
        { url: "/assets/IMG-20260530-WA0020.jpg.jpeg", caption: "saat-saat manis kita berdua yang selalu bikin kangen bangett" },
        { url: "/assets/IMG-20260602-WA0003.jpg.jpeg", caption: "senyuman terindah kamu yang gak pernah bosen aku lihattt bebee" },
        { url: "/assets/IMG-20260613-WA0055.jpg.jpeg", caption: "semoga kita terus bareng-bareng dan bikin memori indah lainnya yaaa cintaaa" }
      ],
    buttonText: "buka surat cintaaa"
  },

  // Fase 3: Flower Garden
  garden: {
    title: "our secret garden bebee",
    subtitle: "tap kuncup bunganya satu-satu buat liat hidden message-nya yaaa",
    flowers: [
      { id: 1, name: "mawar merah", color: "from-rose-400 to-red-600", message: "jujur kamu tuh selalu bisa bikin mood aku naikkk, even pas aku lagi hectic atau down bangett. makasih yaa udah jadi sinar matahari buat hidup akuuu sayangg!" },
      { id: 2, name: "tulip pink", color: "from-pink-400 to-rose-500", message: "ketawa kamu, bicara kamu, apapun tentang kamu bikin aku jatuh cinta lagi dan lagiii bebee. makin hari makin sayanggg sama kamu!" },
      { id: 3, name: "matahari", color: "from-yellow-400 to-amber-500", message: "makasih ya udah super sabarr menghadapi aku dan selalu ada buat aku, no matter whatttt. kamu adalah rumah terindah buat aku cintaaa!" },
      { id: 4, name: "lavender", color: "from-purple-400 to-indigo-500", message: "happy birthday sayangg! semoga di umur baru ini kamu makin happyyy, less overthinking, dan semua impian kamu tercapaii semua yaaa bebee!" },
      { id: 5, name: "lily putih", color: "from-slate-100 to-pink-200", message: "i love you to the moon and back sayangg. kemarin, sekarang, dan selamanya. selalu dan selamanya buat aku cintaaa!" }
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