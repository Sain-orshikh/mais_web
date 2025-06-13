// Alumni poster data with detailed information for each graduate
export interface AlumniPosterInfo {
  name: string;
  fileName: string; // File name without extension for the poster image
  description: string;
  achievements: string;
  major: string;
}

export const alumniPosterData: AlumniPosterInfo[] = [
  {
    name: "Г. Амарболд",
    fileName: "misheel mend-amar",
    description: "12Г ангийн сурагч Гантөмөрийн Амарболд нь өөрийн сонгосон сэтгэл зүйч, биологич мэргэжлээр АНУ-ын Adelphi их сургууль, БНХАУ-ын Chinese University of Hong Kong их сургуулиас 60 хүртэлх хувийн тэтгэлэг, элсэх урилга хүлээн аваад байгаа юм.",
    achievements: "Тэрээр суралцах хугацаандаа IGCSE хөтөлбөрт герман хэл, байгалийн ухаан, бизнес судлал, AS/A түвшний хөтөлбөрт математик, хими, биологи, бизнес судлалын хичээлүүдийг тус тус сонгон суралцсан байна.",
    major: "Psychology, Biology"
  },
  {
    name: "Э. Алтансүвд",
    fileName: "altansuvd erdenebileg",
    description: "2025 оны төгсөгч Эрдэнэбилэгийн Алтансүвд нь инженерийн чиглэлээр олон улсын их сургуулиудаас элсэх санал хүлээн авсан.",
    achievements: "Математик, физикийн хичээлүүдэд онцгой амжилт үзүүлсэн бөгөөд олон улсын олимпиадуудад оролцож байсан.",
    major: "Engineering"
  },
  {
    name: "Ц. Анар",
    fileName: "anar tserendavaa",
    description: "Цэрэндаваагийн Анар нь бизнес удирдлагын чиглэлээр АНУ болон Европын их сургуулиудаас урилга хүлээн авсан.",
    achievements: "Бизнес судлал, эдийн засгийн хичээлүүдэд тэргүүлэгч амжилт үзүүлсэн.",
    major: "Business Administration"
  },
  {
    name: "М. Болормаа",
    fileName: "bolormaa munkhbat",
    description: "Мөнхбатын Болормаа нь эмнэлзүйн чиглэлээр олон улсын их сургуулиудаас тэтгэлэгтэй санал хүлээн авсан.",
    achievements: "Биологи, химийн хичээлүүдэд онцгой дүн үзүүлсэн бөгөөд шинжлэх ухааны судалгааны ажилд идэвхтэй оролцсон.",
    major: "Medicine"
  },
  {
    name: "Ч. Давхарбаяр",
    fileName: "davkharbayar chuluunsukh",
    description: "Чулуунсүхийн Давхарбаяр нь компьютерийн ухааны чиглэлээр МУИС болон гадаадын их сургуулиудаас санал хүлээн авсан.",
    achievements: "Програмчлал, математикийн хичээлүүдэд тэргүүлэгч амжилт үзүүлсэн.",
    major: "Computer Science"
  },
  {
    name: "Т. Энхриймаа",
    fileName: "enkhriimaa tuvshinjargal",
    description: "Түвшинжаргалын Энхриймаа нь урлагийн чиглэлээр олон улсын их сургуулиудаас элсэх санал хүлээн авсан.",
    achievements: "Урлаг, дизайны хичээлүүдэд онцгой авьяас гаргасан бөгөөд олон уралдаанд шагнал хүртсэн.",
    major: "Fine Arts"
  },
  {
    name: "Б. Марал",
    fileName: "maral baatarkhuyag",
    description: "Баатархүягийн Марал нь хууль зүйн чиглэлээр АНУ, Австралийн их сургуулиудаас урилга хүлээн авсан.",
    achievements: "Нийгмийн ухааны хичээлүүдэд тэргүүлэгч амжилт үзүүлсэн.",
    major: "Law"
  },
  {
    name: "Д. Мишээл",
    fileName: "misheel dulguun",
    description: "Дүлгүүний Мишээл нь сэтгэл зүйн чиглэлээр олон улсын их сургуулиудаас тэтгэлэгтэй санал хүлээн авсан.",
    achievements: "Сэтгэл зүй, биологийн хичээлүүдэд онцгой дүн үзүүлсэн.",
    major: "Psychology"
  },
  {
    name: "Б. Номунзул",
    fileName: "nomunzul bayasgalan",
    description: "Баясгаланы Номунзул нь эдийн засгийн чиглэлээр МУИС болон гадаадын их сургуулиудаас санал хүлээн авсан.",
    achievements: "Математик, эдийн засгийн хичээлүүдэд тэргүүлэгч амжилт үзүүлсэн.",
    major: "Economics"
  },
  {
    name: "Э. Санчирболд",
    fileName: "sanchirbold enkhtaivan",
    description: "Энхтайваны Санчирболд нь инженерийн чиглэлээр олон улсын их сургуулиудаас элсэх санал хүлээн авсан.",
    achievements: "Физик, математикийн хичээлүүдэд онцгой амжилт үзүүлсэн.",
    major: "Engineering"
  },
  {
    name: "Г. Тамир",
    fileName: "tamir gankhuu",
    description: "Ганхүүгийн Тамир нь спортын менежментийн чиглэлээр олон улсын их сургуулиудаас урилга хүлээн авсан.",
    achievements: "Спорт, биологийн хичээлүүдэд тэргүүлэгч амжилт үзүүлсэн.",
    major: "Sports Management"
  },
  {
    name: "Г. Тэмүүлэн",
    fileName: "temuulen ganzorig",
    description: "Ганзоригийн Тэмүүлэн нь архитектурын чиглэлээр АНУ, Европын их сургуулиудаас санал хүлээн авсан.",
    achievements: "Урлаг, математикийн хичээлүүдэд онцгой дүн үзүүлсэн.",
    major: "Architecture"
  },
  {
    name: "Т. Тэргэл",
    fileName: "tergel tuguldur",
    description: "Түгүлдүрийн Тэргэл нь международных отношенийн чиглэлээр олон улсын их сургуулиудаас тэтгэлэгтэй санал хүлээн авсан.",
    achievements: "Нийгмийн ухааны хичээлүүдэд тэргүүлэгч амжилт үзүүлсэн.",
    major: "International Relations"
  },
  {
    name: "Э. Цэндмаа",
    fileName: "tsendmaa erdenebat",
    description: "Эрдэнэбатын Цэндмаа нь эмнэлзүйн чиглэлээр олон улсын их сургуулиудаас элсэх санал хүлээн авсан.",
    achievements: "Биологи, химийн хичээлүүдэд онцгой амжилт үзүүлсэн.",
    major: "Medicine"
  },
  {
    name: "Д. Цогцул",
    fileName: "tsogtzul dulguun",
    description: "Дүлгүүний Цогцул нь математикийн чиглэлээр олон улсын их сургуулиудаас тэтгэлэгтэй санал хүлээн авсан.",
    achievements: "Математик, физикийн хичээлүүдэд онцгой дүн үзүүлсэн.",
    major: "Mathematics"
  },
  {
    name: "М. Түгүлдүр",
    fileName: "tuguldur munkh-erdene",
    description: "Мөнх-Эрдэнийн Түгүлдүр нь компьютерийн ухааны чиглэлээр МУИС болон гадаадын их сургуулиудаас санал хүлээн авсан.",
    achievements: "Програмчлал, математикийн хичээлүүдэд тэргүүлэгч амжилт үзүүлсэн.",
    major: "Computer Science"
  }
];

// Helper function to get alumni data by name
export const getAlumniDataByName = (name: string): AlumniPosterInfo | undefined => {
  return alumniPosterData.find(alumni => alumni.name === name);
};

// Helper function to get alumni data by fileName
export const getAlumniDataByFileName = (fileName: string): AlumniPosterInfo | undefined => {
  return alumniPosterData.find(alumni => alumni.fileName === fileName);
};
