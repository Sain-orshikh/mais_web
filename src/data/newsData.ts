export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Spring Festival Celebration 2025",
    excerpt: "Join us for our annual Spring Festival featuring cultural performances, traditional food, and student art exhibitions. A celebration of our diverse community and rich traditions.",
    content: `
      <p>We are excited to announce our annual Spring Festival, which will take place on March 15-16, 2025, celebrating the vibrant diversity and rich cultural heritage of our MAIS community.</p>
      
      <h3>Event Highlights</h3>
      <p>This year's festival promises to be our most spectacular yet, featuring:</p>
      <ul>
        <li>Traditional dance performances from Mongolia, Korea, China, and other represented cultures</li>
        <li>International food court with authentic dishes prepared by student families</li>
        <li>Student art exhibition showcasing works from our talented visual arts program</li>
        <li>Live music performances by our school bands and individual artists</li>
        <li>Cultural workshops where students can learn traditional crafts and skills</li>
      </ul>

      <h3>Community Participation</h3>
      <p>The Spring Festival is a testament to the multicultural spirit of MAIS. Students, teachers, and families from over 15 different countries will come together to share their traditions, creating an atmosphere of mutual respect and cultural exchange.</p>

      <h3>Special Performances</h3>
      <p>This year, we're particularly excited to feature a special performance by our Grade 10 students who will present a collaborative piece that blends traditional Mongolian throat singing with contemporary music, symbolizing the harmony between tradition and modernity that defines our school.</p>

      <p>The festival will run from 10:00 AM to 8:00 PM both days, with free admission for all community members. We encourage everyone to come dressed in traditional attire from their home countries to add to the colorful celebration.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop",
    date: "2025-03-10",
    author: "Cultural Activities Committee",
    category: "Events",
    tags: ["culture", "festival", "community", "traditions"]
  },
  {
    id: 2,
    title: "MAIS Students Win International Math Competition",
    excerpt: "Our talented mathematics team secured first place at the Asia-Pacific International Mathematics Olympiad, showcasing exceptional problem-solving skills and dedication.",
    content: `
      <p>We are incredibly proud to announce that our MAIS mathematics team has achieved first place at the prestigious Asia-Pacific International Mathematics Olympiad held in Singapore from February 20-25, 2025.</p>

      <h3>Outstanding Performance</h3>
      <p>Our team, consisting of four exceptional students from Grades 10-12, competed against 89 teams from 23 countries across the Asia-Pacific region. The competition tested advanced mathematical concepts including:</p>
      <ul>
        <li>Advanced algebra and number theory</li>
        <li>Complex geometry and trigonometry</li>
        <li>Combinatorics and probability</li>
        <li>Mathematical reasoning and proof techniques</li>
      </ul>

      <h3>Team Members</h3>
      <p>Our winning team consisted of:</p>
      <ul>
        <li><strong>Batbayar Erdenebaatar (Grade 12)</strong> - Team Captain, scored perfect marks in algebra section</li>
        <li><strong>Li Wei (Grade 11)</strong> - Excelled in geometry problems, contributing crucial solutions</li>
        <li><strong>Sarah Johnson (Grade 11)</strong> - Demonstrated exceptional skills in combinatorics</li>
        <li><strong>Ariunbold Munkhbat (Grade 10)</strong> - Youngest team member, showed remarkable problem-solving abilities</li>
      </ul>

      <h3>Preparation and Dedication</h3>
      <p>The team spent six months preparing for this competition under the guidance of our mathematics department. They participated in weekly training sessions, solved thousands of practice problems, and attended special workshops with guest mathematicians.</p>

      <p>This achievement reflects not only the exceptional talent of our students but also the strength of our mathematics curriculum and the dedication of our teaching staff. We congratulate all team members and look forward to defending our title next year!</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
    date: "2025-02-26",
    author: "Mathematics Department",
    category: "Academics",
    tags: ["mathematics", "competition", "achievement", "international"]
  },
  {
    id: 3,
    title: "New Science Lab Opening Ceremony",
    excerpt: "State-of-the-art laboratory facilities now open for advanced research and experiments. Equipped with cutting-edge technology to enhance learning experiences.",
    content: `
      <p>MAIS proudly inaugurated its new state-of-the-art science laboratory complex on March 1, 2025, marking a significant milestone in our commitment to providing world-class educational facilities.</p>

      <h3>Cutting-Edge Facilities</h3>
      <p>The new science complex spans 1,200 square meters and includes:</p>
      <ul>
        <li><strong>Advanced Physics Laboratory</strong> - Equipped with precision instruments for quantum mechanics and optics experiments</li>
        <li><strong>Modern Chemistry Lab</strong> - Features advanced ventilation systems and specialized equipment for organic and inorganic chemistry</li>
        <li><strong>Biology Research Center</strong> - Includes microscopy suite with electron microscopes and DNA analysis equipment</li>
        <li><strong>Environmental Science Station</strong> - Dedicated space for studying local ecosystems and environmental monitoring</li>
        <li><strong>Maker Space</strong> - 3D printing facilities and robotics equipment for interdisciplinary projects</li>
      </ul>

      <h3>Technology Integration</h3>
      <p>Each laboratory is equipped with smart boards, data logging equipment, and computer workstations that allow students to conduct sophisticated experiments and analyze results using professional-grade software.</p>

      <h3>Student Impact</h3>
      <p>The new facilities will enable our students to engage in hands-on learning experiences that were previously only available at university level. Students will now be able to:</p>
      <ul>
        <li>Conduct independent research projects</li>
        <li>Participate in international science fairs</li>
        <li>Collaborate with local universities on research initiatives</li>
        <li>Prepare for advanced science competitions</li>
      </ul>

      <p>The laboratory complex was designed with sustainability in mind, featuring solar panels, rainwater collection systems, and energy-efficient LED lighting throughout. This aligns with our school's commitment to environmental responsibility and provides real-world examples for our environmental science curriculum.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=400&fit=crop",
    date: "2025-03-01",
    author: "Science Department",
    category: "Facilities",
    tags: ["science", "laboratory", "technology", "research"]
  },
  {
    id: 4,
    title: "Student Exchange Program Announcement",
    excerpt: "Exciting opportunities for cultural exchange with partner schools worldwide. Applications now open for semester programs in Europe, North America, and Australia.",
    content: `
      <p>MAIS is thrilled to announce the expansion of our international student exchange program, offering unprecedented opportunities for our students to experience education and culture in partner schools around the globe.</p>

      <h3>Program Destinations</h3>
      <p>For the 2025-2026 academic year, we are offering exchange opportunities to:</p>
      
      <h4>Europe</h4>
      <ul>
        <li><strong>United Kingdom</strong> - Harrow School, London (2 students, full semester)</li>
        <li><strong>Switzerland</strong> - International School of Geneva (3 students, full year)</li>
        <li><strong>Germany</strong> - Munich International School (2 students, semester)</li>
      </ul>

      <h4>North America</h4>
      <ul>
        <li><strong>United States</strong> - Phillips Academy Andover, Massachusetts (2 students, semester)</li>
        <li><strong>Canada</strong> - Upper Canada College, Toronto (3 students, full year)</li>
      </ul>

      <h4>Asia-Pacific</h4>
      <ul>
        <li><strong>Australia</strong> - Melbourne Grammar School (2 students, semester)</li>
        <li><strong>Japan</strong> - International School of the Sacred Heart, Tokyo (2 students, semester)</li>
      </ul>

      <h3>Application Requirements</h3>
      <p>Eligible students must:</p>
      <ul>
        <li>Be in Grade 10 or 11 at the time of application</li>
        <li>Maintain a minimum GPA of 3.5</li>
        <li>Demonstrate proficiency in English (IELTS 6.5 or equivalent)</li>
        <li>Show active participation in extracurricular activities</li>
        <li>Submit a personal statement and recommendation letters</li>
      </ul>

      <h3>Program Benefits</h3>
      <p>Exchange students will gain:</p>
      <ul>
        <li>Exposure to different educational systems and teaching methods</li>
        <li>Enhanced language skills and cultural competency</li>
        <li>Global network of friends and academic connections</li>
        <li>Increased independence and personal growth</li>
        <li>Valuable experience for university applications</li>
      </ul>

      <p>Applications are due by April 15, 2025. Information sessions will be held every Tuesday at 3:30 PM in the Main Assembly Hall throughout March. Don't miss this incredible opportunity to broaden your horizons!</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop",
    date: "2025-02-15",
    author: "International Programs Office",
    category: "Programs",
    tags: ["exchange", "international", "travel", "education"]
  },
  {
    id: 5,
    title: "Annual Sports Day Championships",
    excerpt: "Athletes showcase their talents in various sports competitions. Inter-house competitions foster teamwork, sportsmanship, and healthy competition among students.",
    content: `
      <p>The annual MAIS Sports Day Championships concluded with tremendous success on February 10, 2025, bringing together over 400 students in a celebration of athletic excellence, teamwork, and school spirit.</p>

      <h3>Competition Overview</h3>
      <p>This year's championships featured competitions across multiple categories:</p>
      
      <h4>Track and Field Events</h4>
      <ul>
        <li>100m, 200m, and 400m sprints</li>
        <li>800m and 1500m distance races</li>
        <li>Long jump and high jump</li>
        <li>Shot put and discus throw</li>
        <li>4x100m relay races</li>
      </ul>

      <h4>Team Sports</h4>
      <ul>
        <li>Football (Soccer) - boys and girls divisions</li>
        <li>Basketball - mixed teams</li>
        <li>Volleyball - inter-house competition</li>
        <li>Rugby touch - exhibition matches</li>
      </ul>

      <h3>House Competition Results</h3>
      <p>The inter-house competition saw fierce but friendly rivalry among our four houses:</p>
      <ol>
        <li><strong>Golden Eagles</strong> - 245 points (Champion House)</li>
        <li><strong>Blue Dragons</strong> - 232 points</li>
        <li><strong>Red Tigers</strong> - 218 points</li>
        <li><strong>Green Wolves</strong> - 205 points</li>
      </ol>

      <h3>Outstanding Performances</h3>
      <p>Several students achieved remarkable results:</p>
      <ul>
        <li><strong>Munkhtulga Batbayar (Grade 12)</strong> - Set new school record in 100m sprint (11.2 seconds)</li>
        <li><strong>Emma Thompson (Grade 11)</strong> - Won three individual events: 800m, 1500m, and long jump</li>
        <li><strong>Tsolmon Erdene (Grade 10)</strong> - Youngest student to win high jump competition</li>
        <li><strong>Mixed Basketball Team Alpha</strong> - Undefeated champions with innovative team strategies</li>
      </ul>

      <h3>Community Spirit</h3>
      <p>Beyond the competitive aspect, Sports Day emphasized our core values of respect, determination, and teamwork. Students cheered enthusiastically for competitors from all houses, demonstrating the strong sense of community that defines MAIS.</p>

      <p>Special recognition goes to our Grade 12 students who organized and officiated many of the events, showing exceptional leadership and contributing to the smooth running of the championships.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
    date: "2025-02-11",
    author: "Physical Education Department",
    category: "Sports",
    tags: ["sports", "competition", "athletics", "teamwork"]
  },
  {
    id: 6,
    title: "Environmental Sustainability Initiative",
    excerpt: "New green campus initiatives launched to promote environmental awareness. Solar panels, recycling programs, and eco-friendly practices implemented across the school.",
    content: `
      <p>MAIS has launched a comprehensive Environmental Sustainability Initiative, demonstrating our commitment to creating a carbon-neutral campus and educating the next generation of environmental stewards.</p>

      <h3>Solar Energy Implementation</h3>
      <p>The centerpiece of our initiative is the installation of 200 solar panels across our campus buildings, which will:</p>
      <ul>
        <li>Generate 150kW of clean energy daily</li>
        <li>Reduce our carbon footprint by 40%</li>
        <li>Save approximately $30,000 annually in energy costs</li>
        <li>Serve as a real-world learning tool for our physics and environmental science classes</li>
      </ul>

      <h3>Comprehensive Recycling Program</h3>
      <p>Our new recycling initiative includes:</p>
      <ul>
        <li><strong>Paper and Cardboard</strong> - Specialized bins in every classroom and office</li>
        <li><strong>Plastic Sorting</strong> - Color-coded system for different types of plastics</li>
        <li><strong>Electronic Waste</strong> - Dedicated collection point for old computers and devices</li>
        <li><strong>Organic Waste</strong> - Composting program for cafeteria food scraps</li>
        <li><strong>Battery Collection</strong> - Safe disposal system for all types of batteries</li>
      </ul>

      <h3>Campus Beautification</h3>
      <p>Environmental awareness extends to our physical spaces through:</p>
      <ul>
        <li>Native plant gardens that require minimal watering</li>
        <li>Rainwater collection systems for irrigation</li>
        <li>LED lighting conversion throughout all buildings</li>
        <li>Motion sensor controls to reduce energy waste</li>
      </ul>

      <h3>Student Leadership</h3>
      <p>The Environmental Club, led by Grade 11 students, has taken ownership of many initiatives:</p>
      <ul>
        <li>Weekly campus clean-up drives</li>
        <li>Educational presentations to younger students</li>
        <li>Monitoring and reporting on recycling progress</li>
        <li>Organizing tree-planting events in the local community</li>
      </ul>

      <h3>Curriculum Integration</h3>
      <p>Sustainability concepts are now integrated across multiple subjects:</p>
      <ul>
        <li><strong>Science</strong> - Climate change and renewable energy studies</li>
        <li><strong>Mathematics</strong> - Data analysis of energy consumption</li>
        <li><strong>Geography</strong> - Environmental impact studies</li>
        <li><strong>English</strong> - Environmental literature and persuasive writing</li>
      </ul>

      <p>Our goal is to achieve carbon neutrality by 2027 and to graduate students who understand their responsibility as global citizens in protecting our planet for future generations.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
    date: "2025-01-20",
    author: "Sustainability Committee",
    category: "Environment",
    tags: ["sustainability", "environment", "solar", "recycling"]
  }
];

export const getNewsById = (id: number): NewsItem | undefined => {
  return newsData.find(news => news.id === id);
};

export const getAllNews = (): NewsItem[] => {
  return newsData;
};
