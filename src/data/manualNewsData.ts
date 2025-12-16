// Utility to manage news images - using Cloudinary URLs  
import { generateNewsImageUrl } from '../utils/cloudinaryConfig';

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  thumbnailUrl: string; // For lower quality news card images
  // Mongolian translations (optional)
  titleMn?: string;
  contentMn?: string;
  excerptMn?: string;
}

// Helper function to create excerpt from content
function createExcerpt(content: string): string {
  // Remove HTML tags and get first 150 characters
  const cleanText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (cleanText.length <= 150) {
    return cleanText;
  }
  return cleanText.substring(0, 150).trim() + '...';
}

export const manualNewsData: NewsItem[] = [  {
    id: 1,
    title: "TEDxMAIS 2025 Successfully Held for the Second Time",
    content: `
      <p>In April 2025, TEDxMAIS was successfully organized for the second time, in full alignment with international standards. TEDx is a special program under TED that empowers local communities to share ideas and spark meaningful dialogue through independently organized events.</p>
      
      <p>This year, eight outstanding speakers took the stage to present thought-provoking talks on a wide range of topics. The speakers and their talk titles were:</p>
      
      <ul>
        <li><strong>Tanan-Erdene B. (Grade 10A)</strong> – "Living the Forgotten Future"</li>
        <li><strong>Burenjargal B. (Grade 10D)</strong> – "Love, UB: A City Seen (Again)"</li>
        <li><strong>Khorolsuren S. (Tomujin School)</strong> – "A City That Breathes"</li>
        <li><strong>Bujinlkham B. (Grade 11A)</strong> – "Communicating Effectively: How We Are Talking More Than Ever, But Saying Less Than Before"</li>
        <li><strong>Dulguun B. (Grade 11A)</strong> – "Overcoming Procrastination"</li>
        <li><strong>Enguun G. (Grade 9D)</strong> – "The Language of Cells: How Your Body Talks Without You"</li>
        <li><strong>Nomin B. (Grade 11A)</strong> – "You Are the Place, Not the Traveler"</li>
        <li><strong>Guest Speaker: Aminzaya B. (Vanderbilt University Class of 2029)</strong> – "The Bridge"</li>
      </ul>
      
      <p>Each speaker delivered a unique and impactful presentation, showcasing not only their individual perspectives and communication skills, but also introducing fresh ideas and original solutions to modern-day challenges.</p>
      
      <p>Our guest speaker, Aminzaya B., shared a personal journey of perseverance and self-discovery. Choosing not to enroll directly in university, she spent time teaching at her alma mater, Tomujin School, to gain experience and confidence. Her inspiring talk highlighted how this decision helped her grow and ultimately gain admission to her dream university in the United States. Her story served as a powerful example and source of motivation for our students.</p>    `,
    excerpt: "", // Will be auto-generated from content
    titleMn: "TEDxMAIS 2025-г хоёр дахь удаагаа амжилттай зохион байгууллаа",
    contentMn: `
      <p>2025 оны 04 дүгээр сард TEDxMAIS-г хоёр дахь удаагаа, олон улсын стандартад нийцүүлэн амжилттай зохион байгууллаа. TEDx бол орон нутгийн түвшинд, өөрсдийн нийгэмд хувь нэмэр оруулахыг хүссэн хүмүүсийн санаачлан хэрэгжүүлдэг TED-ийн тусгай хөтөлбөр юм.</p>
      
      <p>Энэ жил 8 шилдэг илтгэгч нарыг бэлтгэж дараах сонирхолтой сэдвүүдээр амжилттай оролцлоо. Үүнд:</p>
      
      <ul>
        <li><strong>10а ангийн сурагч Б.Танан-Эрдэнэ</strong> – "LIVING THE FORGOTTEN FUTURE"</li>
        <li><strong>10г ангийн сурагч Б.Бүрэнжаргал</strong> – "LOVE, UB: A CITY SEEN (AGAIN)"</li>
        <li><strong>Томужин сургуулийн сурагч С.Хоролсүрэн</strong> – "A CITY THAT BREATHES"</li>
        <li><strong>11а ангийн сурагч Б.Бүжинлхам</strong> – "COMMUNICATING EFFECTIVELY: HOW WE ARE TALKING MORE THAN EVER, BUT SAYING LESS THAN BEFORE"</li>
        <li><strong>11а ангийн сурагч Б.Дөлгөөн</strong> – "OVERCOMING PROCRASTINATION"</li>
        <li><strong>9г ангийн сурагч Г.Энгүүн</strong> – "THE LANGUAGE OF CELLS: HOW YOUR BODY TALKS WITHOUT YOU"</li>
        <li><strong>11а ангийн сурагч Б.Номин</strong> – "YOU ARE THE PLACE, NOT THE TRAVELER"</li>
        <li><strong>Зочин илтгэгч: Б.Аминзаяа (Vanderbilt University Class of 2029)</strong> – "THE BRIDGE"</li>
      </ul>
      
      <p>Илтгэгч бүр хувь хүний онцлог, илтгэх ур чадвараа харуулан, шинэлэг санаа, аливааг харах өнцөг, өөрийн шийдлээ хуваалцлаа.</p>
      
      <p>Зочин илтгэгч Б.Аминзаяа нь хүсэл мөрөөдөлдөө тууштай байснаар урт хугацаанд хэрхэн амжилтад хүрэх талаар өөрийн туршлага дээр үндэслэн илтгэлээ тавилаа. Тэрээр өөрийгөө олох, олон талаар нээх зорилгоор шууд их дээд сургуульд оролгүй, өөрийн төгссөн Томужин сургуульдаа багшилснаар маш их туршлага хуримтлуулж өөртөө итгэх итгэл олж авахын зэрэгцээ АНУ-д хүссэн сургуульдаа тэнцэж чадсан тухайгаа ярьсан нь ахлах ангийн сурагчдад үлгэр жишээ, урам зориг өглөө.</p>    `,
    excerptMn: "",
    imageUrl: `/news/webp/news1.webp`, // Local WebP first
    thumbnailUrl: generateNewsImageUrl("news1") // JPG fallback from Cloudinary
  },  {
    id: 2,
    title: "MAMUN 2025 Successfully Concludes",
    content: `
      <p>As part of the 2024–2025 academic year's project-based learning initiative, the Mongol Aspiration Model United Nations (MAMUN) Conference was successfully held in an open format on March 29–30. Now in its fifth year, the conference brought together 73 students from Grades 9 to 12 and 6 teachers from Mongol Aspiration School, alongside 120 students from over 40 other secondary schools—marking a significant milestone in this year's event.</p>
      
      <p>The student delegates conducted in-depth research on issues surrounding the 17 Sustainable Development Goals, focusing on protecting the environment, maintaining ecological balance, and evaluating global responses to pressing environmental challenges. Their research took place from March 15 to 28, with guidance and support provided by teachers and senior student chairs from Grade 12.</p>
      
      <p>Throughout the event, participants enhanced not only their understanding of complex global issues but also honed critical academic and communication skills—formulating arguments, analyzing problems from multiple perspectives, evaluating consequences, and advancing their English speaking and writing abilities. This experience laid a strong foundation for their future as young scholars and global citizens, recognizing the interdependence of our shared world and the importance of collective action.</p>
      
      <p>The conference was chaired by students Dulguun G. (Grade 12B), Anar Ts. (Grade 12A), and Amin-Oyun G. (Grade 11G), and concluded with the selection of outstanding delegates across four committees:</p>
      
      <h3>Economic and Social Council (ECOSOC):</h3>
      <ul>
        <li><strong>Best Delegate:</strong> Vansemberuu S. – Goethe School</li>
        <li><strong>Outstanding Delegate:</strong> Maralgoo G. – Selbe School</li>
        <li><strong>Honorable Mentions:</strong>
          <ul>
            <li>Zolboot B. – Mongol Aspiration School</li>
            <li>Misheel A. – JET School</li>
            <li>Tegshtamir B. – Mongol Aspiration School</li>
          </ul>
        </li>
      </ul>
      
      <h3>United Nations General Assembly (UNGA):</h3>
      <ul>
        <li><strong>Best Delegate:</strong> Amina U. – Olonglog School</li>
        <li><strong>Outstanding Delegate:</strong> Munkh-Orgil E. – Orkhon Empathy School</li>
        <li><strong>Honorable Mentions:</strong>
          <ul>
            <li>Dulguun E. – Amjilt Cyber School</li>
            <li>Burenjargal B. – Mongol Aspiration School</li>
            <li>Khulan M. – Orkhon Empathy School</li>
          </ul>
        </li>
      </ul>
      
      <h3>Historical Crisis Committee (HCC):</h3>
      <ul>
        <li><strong>Best Delegate:</strong> Enkhsergelen E. – American School</li>
        <li><strong>Outstanding Delegate:</strong> Anar A. – Tomujin School</li>
        <li><strong>Honorable Mentions:</strong>
          <ul>
            <li>Gan-Erdene E. – Elite School</li>
            <li>Sansarmaa S. – Mongol Aspiration School</li>
            <li>Tod-Oy B. – British School</li>
          </ul>
        </li>
      </ul>
      
      <h3>United Nations Security Council (UNSC):</h3>
      <ul>
        <li><strong>Best Delegate:</strong> Guyug B. – Orchlon School</li>
        <li><strong>Outstanding Delegate:</strong> Suvd G. – British School</li>
        <li><strong>Honorable Mention:</strong> Erdenebat B. – New Era School</li>
      </ul>
      
      <p>A special highlight of MAMUN 2025 was the introduction of a dedicated committee for first-time debaters, offering a welcoming environment to explore diplomacy and public speaking. We extend our heartfelt gratitude to our sponsor, the team at Khas brand, for their generous support of this meaningful initiative.</p>    `,    
    excerpt: "", // Will be auto-generated from content
    titleMn: "MAMUN 2025 амжилттай өндөрлөлөө",
    contentMn: `
      <p>2024-2025 оны хичээлийн жилийн төсөл судалгааны ажлын хүрээнд НҮБ-ийн загварчилсан хурал буюу MAMUN-г тав дахь жилдээ 03 дугаар сарын 29-30-ны өдрүүдэд нээлттэй хэлбэрээр зохион байгууллаа. Энэ жил манай сургуулийн 9-12 дугаар ангийн 73 сурагч, 6 багш болон 40 гаруй дунд сургуулийн 120 гаруй сурагч оролцсон нь энэ жилийн чухал онцлог байлаа.</p>
      
      <p>Сурагч төлөөлөгчид НҮБ-ийн тогтвортой хөгжлийн 17 зорилтод нийцүүлэн байгаль орчныг хамгаалах, экологийн тэнцвэрийг хадгалах, байгаль орчны асуудлаар дэлхийн хэмжээнд авч буй арга хэмжээг үнэлэх зэрэг сэдвээр 03 дугаар сарын 15-28-ны хооронд судалгааны ажлаа гүйцэтгэж, ахлах ангийн сурагчид болон багш нараас дэмжлэг авсан.</p>
      
      <p>Арга хэмжээний туршид сурагчид дэлхийн хэмжээний олон асуудлыг ойлгох зөвхөн бус аргументлэх, олон талаас дүгнэх, үр дагаврыг тооцоолох, англи хэлээр яриа бичих чадварыг хөгжүүлэн ирээдүйн ухаантай иргэн болон дэлхий дахинх нийтдээ хамааралтай орчныг ойлгож хамтын арга хэмжээний ач холбогдлыг ухаарсан.</p>
      
      <p>12б ангийн Г.Дөлгөөн, 12а ангийн Ц.Анар, 11г ангийн Г.Амин-Оюуны удирдсан энэхүү хурлын эцэст дөрвөн хорооноос шилдэг төлөөлөгчдийг тодруулав. Үүнд:</p>
      
      <h3>Эдийн засаг нийгмийн зөвлөлийн хороо:</h3>
      <ul>
        <li><strong>Шилдэг төлөөлөгч:</strong> С.Вансэмбэрүү – Гете сургууль</li>
        <li><strong>Сайн төлөөлөгч:</strong> Г.Маралгоо – Сэлбэ сургууль</li>
        <li><strong>Онцгой дурдагдах:</strong>
          <ul>
            <li>Б.Золбоот – Монгол өсөлт сургууль</li>
            <li>А.Мишээл – JET сургууль</li>
            <li>Б.Тэгштамир – Монгол өсөлт сургууль</li>
          </ul>
        </li>
      </ul>
      
      <h3>НҮБ-ийн Ерөнхий Ассамблей:</h3>
      <ul>
        <li><strong>Шилдэг төлөөлөгч:</strong> У.Амина – Олонлог сургууль</li>
        <li><strong>Сайн төлөөлөгч:</strong> Э.Мөнх-Өргил – Орхон өршөөл сургууль</li>
        <li><strong>Онцгой дурдагдах:</strong>
          <ul>
            <li>Э.Дөлгөөн – Амжилт кибер сургууль</li>
            <li>Б.Бүрэнжаргал – Монгол өсөлт сургууль</li>
            <li>М.Хулан – Орхон өршөөл сургууль</li>
          </ul>
        </li>
      </ul>
      
      <h3>Түүхэн хямралын хороо:</h3>
      <ul>
        <li><strong>Шилдэг төлөөлөгч:</strong> Э.Энхсэргэлэн – Америк сургууль</li>
        <li><strong>Сайн төлөөлөгч:</strong> А.Анар – Томужин сургууль</li>
        <li><strong>Онцгой дурдагдах:</strong>
          <ul>
            <li>Э.Ган-Эрдэнэ – Элит сургууль</li>
            <li>С.Сансармаа – Монгол өсөлт сургууль</li>
            <li>Б.Тод-Ой – Брит сургууль</li>
          </ul>
        </li>
      </ul>
      
      <h3>НҮБ-ийн Аюулгүйн Зөвлөлийн хороо:</h3>
      <ul>
        <li><strong>Шилдэг төлөөлөгч:</strong> Б.Гүюг – Орчлон сургууль</li>
        <li><strong>Сайн төлөөлөгч:</strong> Г.Сувд – Брит сургууль</li>
        <li><strong>Онцгой дурдагдах:</strong> Б.Эрдэнэбат – Шинэ эрин сургууль</li>
      </ul>
      
      <p>MAMUN 2025-ын онцгой зүйл бол анх удаа оролцогчдод зориулсан хороог байгуулснаар дипломат илтгэх ур чадварыг эзэмшүүлэхэд оршино. Энэхүү утга учиртай арга хэмжээг санхүүжүүлэн дэмжсэн "Хас" брэндийн багийнханд талархал илэрхийлье.</p>    `,    excerptMn: "",
    imageUrl: `/news/webp/news2.webp`, // Local WebP first
    thumbnailUrl: generateNewsImageUrl("news2") // JPG fallback from Cloudinary
  },
  {
    id: 3,
    title: "Outstanding Cambridge Learner Awards Ceremony",
    content: `
      <p>For the first time in Mongolia, the East Asia Regional Office of Cambridge International Education hosted the Outstanding Cambridge Learner Awards Mongolia to honor top-performing students from Cambridge curriculum schools. The event was proudly held at Orchlon School.</p>
      
      <p>Based on the results of the Cambridge Spring 2024 examination series, awards were presented in four categories:</p>
      
      <ul>
        <li><strong>High Achievement</strong> – for exceptional results in subjects not widely taken</li>
        <li><strong>Top in Mongolia</strong> – for the highest mark in Mongolia in a commonly taken subject</li>
        <li><strong>Best Across</strong> – for the highest cumulative performance across subjects at a particular level</li>
        <li><strong>Top in the World</strong> – for the highest mark globally in a specific subject</li>
      </ul>
      
      <p>The awards were presented by Mr. Joe Thornton-Beech, Director of Quality, Performance, and Risk at Cambridge International; Ms. Jing Zhao, East Asia Regional Director; H.E. Fiona Blyth, British Ambassador to Mongolia; and Ms. Ts. Tsatsestseg, Senior Specialist for Local Education Development and Management at the General Authority for Education of Mongolia.</p>
      
      <p>A total of 49 students from 11 schools received 57 awards, and we are proud to announce that 13 students from Mongol Aspiration School were among the awardees. The recognized students are as follows:</p>
      
      <h3>High Achievement:</h3>
      <ul>
        <li><strong>Amirlan Enkhtur (13B)</strong> – Computer Science (A Level)</li>
        <li><strong>Temuulen Dorjbaatar (13A)</strong> – Business (A Level)</li>
        <li><strong>Gantsetseg Erdene-Ochir (12C)</strong> – Geography (AS Level)</li>
        <li><strong>Nyambayar Byambadorj (11D)</strong> – Music (IGCSE Level)</li>
      </ul>
      
      <h3>Top in Mongolia:</h3>
      <ul>
        <li><strong>Tod-Od Ganbaatar (11D)</strong> – Computer Science (IGCSE)</li>
        <li><strong>Khos-Erdene Sukhbaatar (11C)</strong> – Economics (IGCSE)</li>
        <li><strong>Undarga Uuganbaatar (13C)</strong> – Mathematics (A Level)</li>
        <li><strong>Saruul Ganbaatar (13A)</strong> – Biology (A Level)</li>
        <li><strong>Khuslen Batchuluun (11D)</strong> – German (IGCSE)</li>
        <li><strong>Siilen Yondondüichir (11B)</strong> – German (IGCSE)</li>
        <li><strong>Tanan-Erdene Battör (10A)</strong> – Chinese (IGCSE)</li>
        <li><strong>Batkhishig Odgerel (11D)</strong> – Geography (IGCSE)</li>
      </ul>
      
      <h3>Best Across:</h3>
      <ul>
        <li><strong>Dulguun Gansukh (Private Candidate)</strong> – Best Across A Level</li>
      </ul>
      
      <p>We extend our heartfelt congratulations to all award recipients, their dedicated teachers, and the supportive parents and guardians who contributed to these remarkable achievements. On behalf of the school administration and faculty, we wish all our students continued success in their academic journeys.</p>    `,
    excerpt: "", // Will be auto-generated from content
    titleMn: "Outstanding Cambridge суралцагчийн шагналын арга хэмжээ",
    contentMn: `
      <p>Кембрижийн Олон улсын боловсролын Зүүн Азийн бүсийн алба анх удаа Монгол орны хэмжээнд Кембрижийн хичээлийн хөтөлбөрийн дагуу сурч байгаа сурагчдын дунд шилдэг үр дүн үзүүлсэн сурагчдыг урамшуулах "Outstanding Cambridge Learner Awards Mongolia" арга хэмжээг зохион байгууллаа. Арга хэмжээг Орчлон сургуульд зохион байгууллаа.</p>
      
      <p>Кембрижийн 2024 оны хаврын шалгалтын улмаас дөрвөн ангиллаар шагнал гардуулав. Үүнд:</p>
      
      <ul>
        <li><strong>High Achievement</strong> – олон хүн авдаггүй хичээлээр онцгой үр дүн гаргасан</li>
        <li><strong>Top in Mongolia</strong> – олон хүн авдаг хичээлээр Монгол орны хэмжээнд хамгийн өндөр оноо авсан</li>
        <li><strong>Best Across</strong> – тухайн түвшинд олон хичээлээр хамгийн өндөр нийлбэр үр дүн гаргасан</li>
        <li><strong>Top in the World</strong> – тухайн хичээлээр дэлхийн хэмжээнд хамгийн өндөр оноо авсан</li>
      </ul>
      
      <p>Шагналыг Кембрижийн Олон улсын боловсролын Чанар, Гүйцэтгэл, Эрсдэлийн албаны захирал Жо Торнтон-Бийч, Зүүн Азийн бүсийн захирал Жин Жао, Монгол дахь Их Британийн элчин сайд Фиона Блит, Монголын Боловсролын Ерөнхий Газрын Орон нутгийн боловсролын хөгжил, удирдлагын ахлах мэргэжилтэн Ц.Цацэсцэг нар гардуулсан.</p>
      
      <p>Нийт 11 сургуулийн 49 сурагч 57 шагнал хүртэж, тэдгээрийн дотор манай сургуулийн 13 сурагч шагналт болсондоо бид бахархаж байна. Тэдгээр сурагчид:</p>
      
      <h3>High Achievement:</h3>
      <ul>
        <li><strong>13б ангийн А.Энхтүр</strong> – Computer Science (A Level)</li>
        <li><strong>13а ангийн Т.Дорж баатар</strong> – Business (A Level)</li>
        <li><strong>12в ангийн Г.Эрдэнэ-Очир</strong> – Geography (AS Level)</li>
        <li><strong>11г ангийн Н.Бямбадорж</strong> – Music (IGCSE Level)</li>
      </ul>
      
      <h3>Top in Mongolia:</h3>
      <ul>
        <li><strong>11г ангийн Т.Ганбаатар</strong> – Computer Science (IGCSE)</li>
        <li><strong>11в ангийн Х.Сүхбаатар</strong> – Economics (IGCSE)</li>
        <li><strong>13в ангийн У.Ууганбаатар</strong> – Mathematics (A Level)</li>
        <li><strong>13а ангийн С.Ганбаатар</strong> – Biology (A Level)</li>
        <li><strong>11г ангийн Х.Батчулуун</strong> – German (IGCSE)</li>
        <li><strong>11б ангийн С.Ёндондүйчир</strong> – German (IGCSE)</li>
        <li><strong>10а ангийн Т.Баттөр</strong> – Chinese (IGCSE)</li>
        <li><strong>11г ангийн Б.Өдгэрэл</strong> – Geography (IGCSE)</li>
      </ul>
      
      <h3>Best Across:</h3>
      <ul>
        <li><strong>Д.Гансүх (бие даасан нэр дэвшигч)</strong> – Best Across A Level</li>
      </ul>
      
      <p>Шагналт болсон бүх сурагчид болон тэдний багш нар, эцэг эх, асран хамгаалагчдад баяр хүргэе. Сургуулийн удирдлага, багш нарын нэрийн өмнөөс бүх сурагчдад цаашдын амжилт хүсье.</p>    `,
    excerptMn: "",
    imageUrl: `/news/webp/news3.webp`, // Local WebP first
    thumbnailUrl: generateNewsImageUrl("news3") // JPG fallback from Cloudinary
  },  {
    id: 4,
    title: "Students from Mongol Temuulel School Win Top 3 Spot in National YES4GREEN Youth Business Challenge",
    content: `
      <p>We are proud to announce that Yalguun E. and Zaluudai E. of Grade 11A, and Khos-Erdene S. of Grade 11B at Mongol Temuulel School have placed in the Top 3 among 67 teams in the YES4GREEN Youth Business Project Competition, organized by UNICEF Mongolia. Their project, which focuses on converting food waste into organic bio-fertilizer, was awarded ₮30 million in funding.</p>
      
      <p>The competition aimed to promote green innovation and sustainable entrepreneurship among youth aged 16–24, with a focus on renewable energy and environmental protection. The students formed the team "N.E.N Fertilizer", and through their creativity, innovation, and commitment to sustainability, they stood out as role models and leaders among their peers.</p>
      
      <p>The project was first announced in March 2024, with the preliminary round held on August 5, 2024. After being selected as one of the top 7 teams, the students participated in a 4-week business development and mentorship program organized by UNICEF. They presented their final business pitch at the concluding round yesterday, securing a spot among the best.</p>
      
      <p>We extend our warmest congratulations to Yalguun, Zaluudai, and Khos-Erdene on this outstanding achievement, and express our deep gratitude to their Business Studies teacher, Mrs. Enkhtuya, for her invaluable guidance and support throughout the process.</p>
    `,
    excerpt: "", // Will be auto-generated from content
    titleMn: "Монгол тэмүүлэл сургуулийн сурагчид YES4GREEN тэмцээнд шилдэг 3-т шалгарлаа",
    contentMn: `
      <p>НҮБ-ын Хүүхдийн Сангаас 16-24 насны хүүхэд, залуучуудын дунд зарласан YES4GREEN ногоон шийдэл, сэргээгдэх эрчим хүч, хүрээлэн буй орчноо хамгаалах чиглэлийн бизнес төслийн тэмцээнд Монгол тэмүүлэл сургуулийн 11А ангийн сурагч Э.Ялгуун, Э.Залуудай, 11В ангийн сурагч С.Хос-Эрдэнэ нар хүнсний хог хаягдлыг ашиглан био-бордоо гаргаж авах төслөөрөө оролцож, нийт 67 төслөөс шилдэг 3-т шалгаран 30 сая төгрөгийн санхүүжилт авах эрхээр шагнагдлаа.</p>
      
      <p>Тогтвортой хөгжлийн үзэл санааг тусгасан, ногоон ирээдүйн төлөөх бизнес төслийн тэмцээнд өөрсдийн шинэ санаа, бүтээлч сэтгэлгээ, ур чадвараа уралдуулан өрсөлдөж, олон залуусыг манлайлсан "N.E.N Бордоо" багийн гишүүн 11А ангийн сурагч Э.Ялгуун, Э.Залуудай, 11В ангийн сурагч С.Хос-Эрдэнэ нартаа сургууль хамт олныхоо өмнөөс халуун баяр хүргэе!</p>
      
      <p>Энэхүү төсөл нь 2024 оны 03-р сард зарлагдсан бөгөөд эхний шатны шалгаруулалт 2024 оны 08 дугаар сарын 05-нд явагдсан. 1-р шатнаас шалгарсан шилдэг 7 баг НҮБ-ын Хүүхдийн Сангаас зохион байгуулсан бизнес төсөл хөгжүүлэх ментор сургалтад 4 долоо хоногийн турш хамрагдсаны эцэст өчигдөр эцсийн шатны шалгаруулалтад бизнес төслөө танилцуулсан юм.</p>
      
      <p>Мөн сурагчдаа чиглүүлэн дэмжсэн Бизнес судлалын Т.Энхтуяа багшдаа талархал илэрхийлье.</p>
    `,
    excerptMn: "",
    imageUrl: `/news/webp/news4.webp`, // Local WebP first
    thumbnailUrl: generateNewsImageUrl("news4") // JPG fallback from Cloudinary
  },{
    id: 5,
    title: "Mongol Aspiration School Shines at Robot Challenge World 2024 in Beijing",
    content: `
      <p>The "Robot Challenge World 2024" competition was successfully held from August 9–11 at the University of Science and Technology Beijing, China. This international event brought together over 30,000 participants representing more than 300 teams from 31 countries.</p>
      
      <p>From Mongolia, over 70 participants from 9 schools and clubs competed in 10 categories, collectively earning an impressive 2 gold, 5 silver, and 3 bronze medals.</p>
      
      <p>Mongol Temuulel School proudly participated in 9 competition categories with 18 teams comprised of students and teachers. Among their outstanding achievements:</p>
      
      <h3>🥇 1st Place – Gold Medal in Robot Rugby:</h3>
      <ul>
        <li><strong>Tamir G., Sanchirbold E., Davkharbayar Ch. (Grade 11A)</strong></li>
      </ul>
      
      <h3>🥈 2nd Place – Silver Medal in Autonomous Mega Sumo:</h3>
      <ul>
        <li><strong>Mr. Shine-Od G. (Computer Science Teacher), Uujim G., Batkhishig B. (Grade 12D)</strong></li>
      </ul>
      
      <h3>🥈 2nd Place – Silver Medal in Remote-Controlled Mega Sumo:</h3>
      <ul>
        <li><strong>Batkhishig B., Khash-Erdene G. (Grade 12D)</strong></li>
      </ul>
      
      <h3>🥉 3rd Place – Bronze Medal in Unknown Mission:</h3>
      <ul>
        <li><strong>Tod-Od G. (Grade 10D), Arig M. (Grade 10B)</strong></li>
      </ul>
      
      <p>In addition to these medals, several other teams from the school were awarded with:</p>
      
      <ul>
        <li><strong>🏅 3 First Prize Certificates</strong></li>
        <li><strong>🏅 4 Second Prize Certificates</strong></li>
        <li><strong>🏅 7 Third Prize Certificates</strong></li>
      </ul>
        <p>We extend our heartfelt congratulations to all participating students and express our sincere gratitude to teachers Mr. Shine-Od G. and Mr. Davaasuren J. for their dedicated mentorship and support that helped make these achievements possible.</p>
    `,
    excerpt: "", // Will be auto-generated from content
    titleMn: "Монгол тэмүүлэл сургууль Robot Challenge World 2024 тэмцээнд амжилт үзүүллээ",
    contentMn: `
      <p>"Robot Challenge World 2024" тэмцээн 08 дугаар сарын 09-11-ний хооронд БНХАУ-ын нийслэл Бээжин хотын "University of Science and Technology Beijing" их сургууль дээр зохион байгуулагдаж, нийт 31 орны 300 гаруй баг, клубийн 30000-аад оролцогчид оролцлоо. Монгол улсаас нийт 9 сургууль / клубийн 70 гаран оролцогчид оролцсон ба нийт 10 төрлийн тэмцээнээс 2 алт, 5 мөнгө, 3 хүрэл медаль хүртэж бахдам амжилт үзүүллээ.</p>
      
      <p>Монгол тэмүүлэл сургуулийн багш, сурагчид уг тэмцээний 9 төрөлд 18 багийн бүрэлдэхүүнтэй оролцлоо. Үүнээс:</p>
      
      <h3>🥇 Robot rugby төрөлд 1-р байр, алтан медаль:</h3>
      <ul>
        <li><strong>11а ангийн сурагч Г.Тамир, Э.Санчирболд, Ч.Давхарбаяр нар</strong></li>
      </ul>
      
      <h3>🥈 Автомат мега сумо төрөлд 2-р байр, мөнгөн медаль:</h3>
      <ul>
        <li><strong>Компьютерын багш Г.Шинэ-Од, 12г ангийн сурагч Г.Уужим, Б.Батхишиг нар</strong></li>
      </ul>
      
      <h3>🥈 Гар удирдлагатай мега сумо төрөлд 2-р байр, мөнгөн медаль:</h3>
      <ul>
        <li><strong>12г ангийн сурагч Б.Батхишиг, Г.Хаш-Эрдэнэ нар</strong></li>
      </ul>
      
      <h3>🥉 Unknown mission төрөлд 3-р байр, хүрэл медаль:</h3>
      <ul>
        <li><strong>10г ангийн сурагч Г.Тод-Од, 10б ангийн сурагч М.Ариг нар</strong></li>
      </ul>
      
      <p>Мөн үлдсэн багууд:</p>
      
      <ul>
        <li><strong>🏅 THE FIRST PRIZE - 3 сертификат</strong></li>
        <li><strong>🏅 THE SECOND PRIZE - 4 сертификат</strong></li>
        <li><strong>🏅 THE THIRD PRIZE - 7 сертификат</strong></li>
      </ul>
      
      <p>Сурагчдаа амжилттай бэлтгэн дээрх амжилтын эзэд болоход тусалж дэмжсэн Г.Шинэ-Од, Ж.Даваасүрэн багш нартаа баярлалаа.</p>
    `,
    excerptMn: "",
    imageUrl: `/news/webp/news5.webp`, // Local WebP first
    thumbnailUrl: generateNewsImageUrl("news5") // JPG fallback from Cloudinary
  },{
    id: 6,
    title: "Mongol Temuulel School Earns Top Honors at Harvard Model United Nations China 2024",
    content: `
      <p>The Harvard Model United Nations (HMUN) China 2024 was held from August 15–18 in Guangzhou, China, bringing together over 600 high school students from 15 countries for a prestigious international conference of diplomacy, critical thinking, and debate.</p>
      
      <p>Representing Mongol Temuulel School, 14 students from Grades 10–12 participated under the guidance of Mrs. EnkhSaruul (World History teacher) and Ms. Odmaa (Chinese language teacher). Our delegates were assigned to various committees, including:</p>
      
      <ul>
        <li><strong>General Assembly</strong></li>
        <li><strong>Commission on Science and Technology for Development</strong></li>
        <li><strong>International Telecommunication Union</strong></li>
        <li><strong>World Trade Organization</strong></li>
        <li><strong>International Atomic Energy Agency</strong></li>
        <li><strong>Commission on the Status of Women</strong></li>
        <li><strong>SOCHUM (Social, Humanitarian, and Cultural Committee)</strong></li>
        <li><strong>Risk Management Committee</strong></li>
      </ul>
      
      <h3>Individual Awards:</h3>
      
      <h4>🥇 Best Delegate – Commission on Science and Technology for Development:</h4>
      <ul>
        <li><strong>Dulguun G. (Grade 12C)</strong></li>
      </ul>
      
      <h4>🥈 Honorable Mention – SOCHUM:</h4>
      <ul>
        <li><strong>Jonathan B. (Grade 12B)</strong></li>
      </ul>
      
      <h4>🥈 Honorable Mention – Commission on Science and Technology for Development:</h4>
      <ul>
        <li><strong>Misheel D. (Grade 12A)</strong></li>
      </ul>
      
      <h4>🥉 Diplomatic Commendation – World Trade Organization:</h4>
      <ul>
        <li><strong>Altansuvd E. (Grade 12A)</strong></li>
      </ul>
      
      <h4>🥉 Diplomatic Commendation – World Conference on Women:</h4>
      <ul>
        <li><strong>Davaajargal Sh. (Grade 12D)</strong></li>
      </ul>
      
      <h4>🥉 Diplomatic Commendation – International Atomic Energy Agency:</h4>
      <ul>
        <li><strong>Goomaral G. (Grade 10C)</strong></li>
      </ul>
      
      <h3>Delegation Awards by Size:</h3>
      <ul>
        <li><strong>Large Best Delegation:</strong> Shanghai International School</li>
        <li><strong>Small Best Delegation:</strong> Xinjiang International School</li>
        <li><strong>Large Outstanding Delegation:</strong> Mongol Temuulel School 🏆</li>
      </ul>
        <p>Our school was awarded the <strong>Outstanding Organization Delegation Award 🏆</strong> for excellence in coordination and participation. This achievement marked the successful conclusion of this year's Harvard Model United Nations conference and secured our delegation's invitation to participate in the upcoming HARVARD MUN in Boston, USA.</p>
      
      <p>We extend our heartfelt congratulations to the dedicated students and teachers who worked collaboratively to make this possible, and express our sincere gratitude to the supportive parents and school administration.</p>
    `,
    excerpt: "", // Will be auto-generated from content
    titleMn: "Монгол тэмүүлэл сургууль Harvard Model United Nations China 2024-д амжилт үзүүллээ",
    contentMn: `
      <p>Харвардын Нэгдсэн Үндэстний загвар хуралдаан /Harvard Model United Nations/ БНХАУ-ын Гуанжоу хотноо 2024 оны 08 дугаар сарын 15-18-ны өдрүүдэд олон улсын сурагчдын дунд зохион байгуулагдаж, 15 улсын 600 гаруй сурагчид ур чадвар, оюун ухаан, авьяас билгээ уралдуулан мэтгэлцлээ.</p>
      
      <p>Тус хуралдаанд Монгол тэмүүлэл сургуулийн 10-12 дугаар ангийн 14 сурагч, Дэлхийн түүхийн багш П.Энхсаруул, Хятад хэлний багш Д.Одмаа нарын удирдлагад Ерөнхий асамблей, Шинжлэх ухаан технологи, Олон улсын цахилгаан холбоо, Олон улсын худалдаа, Атомын цөмийн энергийн агентлаг, Эрсдэлийн хороо, Эмэгтэйчүүд, Нийгэм соёл хүмүүнлэгийн хороо гэсэн хэсгүүдэд хуваарилагдан оролцлоо.</p>
      
      <h3>Хувь хүний шагналууд:</h3>
      
      <h4>🥇 Best Delegate – Commission on Science and Technology for Development:</h4>
      <ul>
        <li><strong>12в ангийн сурагч Г.Дөлгөөн</strong></li>
      </ul>
      
      <h4>🥈 Honorable Mention – SOCHUM:</h4>
      <ul>
        <li><strong>12б ангийн сурагч Б.Жонатан</strong></li>
      </ul>
      
      <h4>🥈 Honorable Mention – Commission on Science and Technology for Development:</h4>
      <ul>
        <li><strong>12а ангийн сурагч Д.Мишээл</strong></li>
      </ul>
      
      <h4>🥉 Diplomatic Commendation – World Trade Organization:</h4>
      <ul>
        <li><strong>12а ангийн сурагч Э.Алтансувд</strong></li>
      </ul>
      
      <h4>🥉 Diplomatic Commendation – World Conference on Women:</h4>
      <ul>
        <li><strong>12г ангийн сурагч Ш.Даваажаргал</strong></li>
      </ul>
      
      <h4>🥉 Diplomatic Commendation – International Atomic Energy Agency:</h4>
      <ul>
        <li><strong>10в ангийн сурагч Г.Гоомарал</strong></li>
      </ul>
      
      <h3>Нийт оролцогчдын чанараар сургуулиудыг эрэмбэлсэн үр дүн:</h3>
      <ul>
        <li><strong>Large Best Delegation:</strong> Шанхай ОУС</li>
        <li><strong>Small Best Delegation:</strong> Шинжинь ОУС</li>
        <li><strong>Large Outstanding Delegation:</strong> Монгол Тэмүүлэл сургууль 🏆</li>
      </ul>
      
      <p>Outstanding Organization Delegation Award 🏆 "Шилдэг зохион байгуулалттай сургууль"-аар шалгарч энэ жилийн Харвардын Нэгдсэн үндэстний загвар хуралдааныг амжилттай өндөрлөж АНУ-ын Boston-д болох HARVARD MUN оролцохоор боллоо.</p>
      
      <p>Хичээл зүтгэл гаргаж хамтран ажилласан сурагч, багш нарт баяр хүргэж дэмжин тусалсан эцэг эх, сургуулийн удирдлагууддаа талархал илэрхийлье.</p>
    `,
    excerptMn: "",
    imageUrl: `/news/webp/news6.webp`, // Local WebP first
    thumbnailUrl: generateNewsImageUrl("news6") // JPG fallback from Cloudinary
  }
];

// Auto-generate excerpts for all news items
manualNewsData.forEach(item => {
  if (!item.excerpt) {
    item.excerpt = createExcerpt(item.content);
  }
});

export const getNewsById = (id: number): NewsItem | undefined => {
  return manualNewsData.find(news => news.id === id);
};

export const getAllNews = (): NewsItem[] => {
  return manualNewsData;
};
