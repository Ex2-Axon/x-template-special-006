import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Sparkles, 
  Compass, 
  Search, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Calendar, 
  Clock, 
  Award, 
  Sliders, 
  MapPin, 
  CheckCircle2, 
  Star, 
  Phone, 
  User, 
  Activity,
  Workflow,
  CornerDownRight,
  Lock
} from 'lucide-react';

// อินเตอร์เฟซข้อมูลอสังหาริมทรัพย์ระดับลักชัวรี
interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  numericPrice: number; // ล้านบาท
  category: 'Penthouse' | 'Mansion' | 'Private Island';
  image: string;
  details: {
    area: string;
    beds: number;
    baths: number;
    perfectionScore: number; // คะแนนความเพอร์เฟกต์ 98-100
  };
  highlights: string[];
  specs: {
    privacy: number; // %
    aesthetic: number; // %
    security: number; // %
  };
}

const propertiesData: Property[] = [
  {
    id: 'prop-1',
    title: 'The Overlord Sky-Penthouse',
    location: 'Sukhumvit Peak, Bangkok',
    price: '380,000,000 ฿',
    numericPrice: 380,
    category: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    details: { area: '1,250 ตร.ม.', beds: 5, baths: 6, perfectionScore: 99.9 },
    highlights: ['สระว่ายน้ำกระจกนิรภัยลอยฟ้าบนชั้น 88', 'ลิฟต์ส่วนตัวสแกนลายนิ้วมือและม่านตา', 'ระบบควบคุมสภาพอากาศและออกซิเจนบริสุทธิ์'],
    specs: { privacy: 100, aesthetic: 99, security: 100 }
  },
  {
    id: 'prop-2',
    title: 'Aura Obsidian Megamansion',
    location: 'Lakeside Sanctuary, Eastern Outer Ring',
    price: '720,000,000 ฿',
    numericPrice: 720,
    category: 'Mansion',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    details: { area: '3,400 ตร.ม.', beds: 8, baths: 10, perfectionScore: 100 },
    highlights: ['โรงจอดรถซูเปอร์คาร์ใต้ดินระบบไฮดรอลิก 12 คัน', 'ผนังกระจกกันกระสุนแบบโค้ง 360 องศา', 'ห้องนิรภัยมาตรฐานสูงสุดระดับสากล (Panic Room)'],
    specs: { privacy: 98, aesthetic: 100, security: 100 }
  },
  {
    id: 'prop-3',
    title: 'The Siren Sanctuary Isle',
    location: 'Phuket Deep Blue Archipelago',
    price: '1,450,000,000 ฿',
    numericPrice: 1450,
    category: 'Private Island',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    details: { area: '24 ไร่', beds: 12, baths: 15, perfectionScore: 99.8 },
    highlights: ['ลานจอดเฮลิคอปเตอร์คู่ขนานท่ามกลางวิวทะเล', 'หาดทรายขาวส่วนตัวที่คัดกรองตะกอนพิเศษ', 'ท่าเทียบเรือยอทช์ระดับซูเปอร์เมกะยอทช์'],
    specs: { privacy: 100, aesthetic: 98, security: 99 }
  },
  {
    id: 'prop-4',
    title: 'Celestial Glass Dome Villa',
    location: 'Chao Phraya Riverfront Frontline',
    price: '490,000,000 ฿',
    numericPrice: 490,
    category: 'Mansion',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
    details: { area: '1,800 ตร.ม.', beds: 6, baths: 8, perfectionScore: 99.7 },
    highlights: ['โดมกระจกไร้ขอบพับเปิดรับลมธรรมชาติได้ทั้งหลัง', 'สวนป่าฝนลอยฟ้าในร่มควบคุมอุณหภูมิ', 'ท่าน้ำส่วนตัวพร้อมระเบียงชมวิวโค้งน้ำที่สวยที่สุด'],
    specs: { privacy: 95, aesthetic: 100, security: 98 }
  }
];

export default function App() {
  // สเตตการจัดการหน้าจอและฟิลเตอร์
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Penthouse' | 'Mansion' | 'Private Island'>('All');
  const [priceRange, setPriceRange] = useState<number>(1500); // ล้านบาท
  const [selectedProperty, setSelectedProperty] = useState<Property>(propertiesData[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // สเตตระบบวิดีโอจำลองอัจฉริยะ (Cyber Virtual Tour)
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [tourMode, setTourMode] = useState<'Normal' | 'Thermal' | 'Blueprint'>('Normal');
  const [scanProgress, setScanProgress] = useState<number>(0);

  // สเตตโปรโตคอลความเพอร์เฟกต์ (Perfection Inspection Checkbox)
  const [checkedProtocols, setCheckedProtocols] = useState<Record<string, boolean>>({
    'p1': true, 'p2': true, 'p3': false, 'p4': false, 'p5': false
  });

  // สเตตระบบจองคิวสุดเอกซ์คลูซีฟ (Private Scheduler)
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // ฟังก์ชันสแกนเลเซอร์ลูปเพื่อสร้างบรรยากาศ Cyber-Luxury แบบโทนสีทองสว่าง
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // ฟิลเตอร์ข้อมูลตามที่ผู้ใช้เลือก
  const filteredProperties = propertiesData.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchPrice = item.numericPrice <= priceRange;
    const matchText = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchPrice && matchText;
  });

  const triggerNotification = (message: string) => {
    setActiveNotification(message);
    setTimeout(() => setActiveNotification(null), 4000);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !clientName || !clientPhone) {
      triggerNotification('กรุณากรอกข้อมูลเพื่อจองสิทธิ์การเข้าชมให้ครบถ้วน');
      return;
    }
    setBookingConfirmed(true);
    triggerNotification('จองสิทธิ์การเข้าชมแบบส่วนตัวสําเร็จ เจ้าหน้าที่จะติดต่อกลับใน 5 นาที');
  };

  const toggleProtocol = (id: string) => {
    setCheckedProtocols(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      
      {/* เอฟเฟกต์แสงออร่าพื้นหลังโทนอุ่นสว่างไสว (Warm Aura Light Ambient) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-[1000px] right-10 w-[700px] h-[700px] bg-rose-100/30 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[800px] h-[800px] bg-amber-100/20 rounded-full blur-[200px] pointer-events-none" />

      {/* แจ้งเตือนลอยตัวดีไซน์สีทองพรีเมียม (Premium Toast UI) */}
      {activeNotification && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className="bg-white/95 border-2 border-amber-500/80 text-slate-900 px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(245,158,11,0.15)] flex items-center gap-3 backdrop-blur-xl">
            <Sparkles className="text-amber-500 w-6 h-6 animate-pulse" />
            <div>
              <p className="font-bold text-sm text-slate-900">ประกาศสิทธิ์ระดับวีไอพี</p>
              <p className="text-xs text-slate-600 font-medium">{activeNotification}</p>
            </div>
          </div>
        </div>
      )}

      {/* แถบนำทางกระจกเงาแก้วใส (Prism Glass Navigation Bar) */}
      <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-stone-200/60 px-6 py-4 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* โลโก้แบรนด์พรีเมียมสีทองแชมเปญ */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-rose-400 p-[1.5px] shadow-[0_4px_15px_rgba(245,158,11,0.2)]">
              <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-amber-500 group-hover:rotate-180 transition-transform duration-1000" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-600 via-rose-500 to-amber-700 bg-clip-text text-transparent">VARISARA</span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-slate-400 font-bold">Aura Luxe Real Estate</span>
            </div>
          </div>

          {/* รายละเอียดสถานะการบริหารและยอดขาย */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-500 font-semibold">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200/60">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="text-slate-700">ควบคุมคุณภาพอย่างสมบูรณ์แบบโดย: วริศรา (CEO)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="text-amber-500 w-4 h-4" />
              <span className="text-slate-700">ยอดขายสะสมสุทธิกว่า 1.8 หมื่นล้านบาท</span>
            </div>
          </div>

          {/* ปุ่ม CTA หรูหราสีแชมเปญโกลด์ */}
          <a 
            href="#schedule-section"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(217,119,6,0.2)] hover:shadow-[0_4px_25px_rgba(217,119,6,0.35)] transition-all duration-300 hover:scale-105"
          >
            นัดหมายระดับ Exclusive
          </a>
        </div>
      </nav>

      {/* ส่วนต้อนรับและวิสัยทัศน์ผู้ก่อตั้ง (Elegant Hero & Vision Section) */}
      <header className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* คอลัมน์ซ้าย: ข้อความและแนวคิดของคุณวริศรา */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            สัมผัสที่สุดของสุนทรียภาพแห่งการอยู่อาศัย
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-slate-900">
            ที่อยู่อาศัยที่สะท้อน <br />
            <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 bg-clip-text text-transparent">
              "ความสมบูรณ์แบบที่แท้จริง"
            </span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-xl leading-relaxed">
            คัดเลือกและตรวจเช็กโครงสร้างด้วยตัวเองทุกขั้นตอนโดย <span className="text-amber-600 font-bold underline decoration-wavy">คุณวริศรา</span> นักออกแบบภายในและตัวแทนอสังหาฯ ผู้รักความเพอร์เฟกต์ระดับ 100% เต็มเท่านั้น เพราะที่อยู่อาศัยของท่านไม่ใช่แค่บ้าน แต่คืออาณาจักรที่ยอดเยี่ยมที่สุดในทุกตารางนิ้ว
          </p>

          {/* คำคมปรัชญาสีทองหรู */}
          <div className="relative border-l-3 border-amber-500 pl-6 py-3 bg-gradient-to-r from-amber-500/5 to-transparent rounded-r-2xl">
            <p className="italic text-slate-700 text-sm leading-relaxed">
              "ความสมบูรณ์แบบไม่ใช่เรื่องบังเอิญ แต่มันเกิดจากความใส่ใจในทุกรายละเอียดของรอยต่อหินอ่อน ทิศทางของแสง และลมธรรมชาติที่พัดผ่านคฤหาสน์ของลูกค้าของฉัน"
            </p>
            <span className="block mt-2.5 text-xs font-bold text-amber-600 uppercase tracking-widest">— วริศรา เสนีย์พิทักษ์, CEO & Founder ของ AURA LUXE</span>
          </div>

          {/* วิดเจ็ตฟิลเตอร์อัจฉริยะโทนสว่างพรีเมียม (Interactive Light Finder) */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-500" />
              ตัวกรองการค้นหาระดับพรีเมียม
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {/* ค้นหาทำเล */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-bold">สถานที่ / ชื่อโครงการ</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="ค้นหาทำเลทองคำ..." 
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pl-9 pr-4 text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* ชนิดคฤหาสน์ */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-bold">ประเภทอสังหาฯ</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="All">ทั้งหมดทุกรูปแบบ</option>
                  <option value="Penthouse">คอนโดลอยฟ้า (Penthouse)</option>
                  <option value="Mansion">เมกะคฤหาสน์ (Mansion)</option>
                  <option value="Private Island">เกาะส่วนตัวสุดลึกลับ</option>
                </select>
              </div>

              {/* สไลเดอร์งบประมาณสูงสุด */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">งบประมาณสูงสุด</span>
                  <span className="text-amber-600 font-black">{priceRange} ล้านบาท</span>
                </div>
                <input 
                  type="range" 
                  min="200" 
                  max="1500" 
                  step="50"
                  value={priceRange} 
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* คอลัมน์ขวา: พอร์ตโฟลิโอรูปภาพเจ้าของแบรนด์ (ความเพอร์เฟกต์ระดับสูง) */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative group w-full max-w-[380px]">
            {/* แสงสว่างทองลอยหลังรูป */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-300 via-rose-300 to-yellow-200 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-70 transition duration-1000" />
            
            <div className="relative bg-white border border-stone-200 rounded-[2rem] overflow-hidden p-3 shadow-2xl">
              <div className="relative h-[420px] rounded-[1.5rem] overflow-hidden bg-stone-100">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
                  alt="ภาพคุณวริศรา ตัวแทนอสังหาฯ" 
                  className="w-full h-full object-cover object-top scale-105 transition-transform duration-700 group-hover:scale-100"
                />
                
                {/* แถบสถานะระบบวิเคราะห์พื้นที่ */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg border border-stone-200 shadow-sm">
                  <span className="text-[10px] text-amber-600 font-black tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    LIVE STATS
                  </span>
                  <span className="text-[10px] text-slate-700 font-bold">ความประณีตระดับ 100%</span>
                </div>

                {/* แสงเลเซอร์สแกนพื้นที่สีทองสว่างไสว */}
                <div 
                  className="absolute left-0 w-full h-[2px] bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,1)]"
                  style={{ top: `${scanProgress}%`, transition: 'top 0.05s linear' }}
                />

                {/* รายละเอียดแบรนด์ด้านล่างรูป */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/80 to-transparent p-6 pt-16">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-amber-600 font-black">FOUNDER & VISIONARY</p>
                    <h3 className="text-xl font-bold text-slate-900">วริศรา เสนีย์พิทักษ์</h3>
                    <p className="text-xs text-slate-600">"การตกแต่งภายในที่ไร้ที่ติ คือกุญแจสำคัญสู่ความมั่งคั่งที่ยั่งยืน"</p>
                  </div>
                </div>
              </div>

              {/* สถิติตัวเลขความเพอร์เฟกต์ด้านล่าง */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <span className="block text-base font-black text-amber-600">99.9%</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">ความพึงพอใจสูง</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <span className="block text-base font-black text-rose-500">100%</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">ผ่านการตรวจประเมิน</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <span className="block text-base font-black text-slate-800">24/7</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">ดูแลแบบบัตเลอร์</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* แดชบอร์ดคัดเลือกผลงานศิลปะอสังหาฯ (Super-Luxury Properties Section) */}
      <section className="bg-stone-100/50 border-y border-stone-200/80 py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600 mb-2">Exclusive Collection</p>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900">ผลงานมาสเตอร์พีซที่ท่านครอบครองได้</h2>
            </div>
            {/* ตัวเลือกแท็บคัดเลือกอสังหาฯ */}
            <div className="mt-4 md:mt-0 flex gap-2 overflow-x-auto pb-2">
              {(['All', 'Penthouse', 'Mansion', 'Private Island'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === cat 
                      ? 'bg-amber-500 text-white shadow-[0_4px_15px_rgba(245,158,11,0.3)]' 
                      : 'bg-white hover:bg-stone-100 text-slate-600 border border-stone-200'
                  }`}
                >
                  {cat === 'All' ? 'คอลเลกชันทั้งหมด' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* รายการอสังหาริมทรัพย์การ์ดสว่างสุดพรีเมียม */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <article 
                  key={property.id}
                  onClick={() => setSelectedProperty(property)}
                  className={`group relative rounded-3xl overflow-hidden bg-white border transition-all duration-500 cursor-pointer shadow-sm ${
                    selectedProperty.id === property.id 
                      ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-xl scale-[1.01]' 
                      : 'border-stone-200 hover:border-amber-300 hover:shadow-md'
                  }`}
                >
                  {/* ภาพถ่ายอสังหาฯ */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    
                    {/* คะแนนความเพอร์เฟกต์ */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-[10px] text-slate-800 font-extrabold">Aura-Score {property.details.perfectionScore}%</span>
                    </div>

                    <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider">
                      {property.category}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[10px] text-amber-200 flex items-center gap-1 font-bold">
                        <MapPin className="w-3.5 h-3.5" />
                        {property.location}
                      </p>
                      <h3 className="text-lg font-black text-white mt-1">{property.title}</h3>
                    </div>
                  </div>

                  {/* สเปกและราคาในการ์ด */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center text-xs text-slate-500 pb-3 border-b border-stone-100">
                      <span>พื้นที่ใช้สอย: <strong className="text-slate-800 font-bold">{property.details.area}</strong></span>
                      <span>ห้องนอน: <strong className="text-slate-800 font-bold">{property.details.beds}</strong> | ห้องน้ำ: <strong className="text-slate-800 font-bold">{property.details.baths}</strong></span>
                    </div>

                    {/* รายละเอียดเพิ่มเติม */}
                    <ul className="space-y-2">
                      {property.highlights.slice(0, 2).map((hl, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ราคาและลิงก์ประมวลผล */}
                    <div className="pt-4 flex justify-between items-center border-t border-stone-100">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">ราคาขายเอกสิทธิ์</span>
                        <span className="text-lg font-black text-amber-600">{property.price}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-600 font-bold uppercase tracking-wider group-hover:text-amber-500 transition-colors">
                        <span>ดูเรดาร์สแกน</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-stone-200 shadow-sm">
                <Shield className="w-12 h-12 text-stone-300 mx-auto mb-4 animate-pulse" />
                <p className="text-slate-500 font-medium">ไม่พบอสังหาริมทรัพย์ระดับเทียมฟ้าที่ตรงกับตัวเลือกของท่าน</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setPriceRange(1500); setSearchQuery(''); }}
                  className="mt-4 px-5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-all"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ส่วนอินเตอร์แอคทีฟวิเคราะห์เรดาร์ความงดงาม (Interactive Radar & Virtual Tour Console) */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-12 gap-12 items-start">
        
        {/* รายละเอียดวัดค่าเชิงลึก (Interactive Light Gauges) */}
        <div className="lg:col-span-5 space-y-8 bg-white p-8 rounded-[2rem] border border-stone-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[2px] w-8 bg-amber-500" />
              <span className="text-xs uppercase tracking-widest text-amber-600 font-bold">Selected Property Radar</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{selectedProperty.title}</h2>
            <p className="text-slate-500 text-xs font-medium mt-1">{selectedProperty.location}</p>
          </div>

          {/* แถบวัดร้อยละความงดงาม (Aesthetic Gages) */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-600 font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-purple-500" />
                  ดัชนีความเป็นส่วนตัวสูงสุด (Absolute Privacy)
                </span>
                <span className="font-extrabold text-purple-600">{selectedProperty.specs.privacy}%</span>
              </div>
              <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-rose-400 transition-all duration-1000"
                  style={{ width: `${selectedProperty.specs.privacy}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-600 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  ความงดงามทางสุนทรียภาพ (Aesthetic Score)
                </span>
                <span className="font-extrabold text-amber-600">{selectedProperty.specs.aesthetic}%</span>
              </div>
              <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-1000"
                  style={{ width: `${selectedProperty.specs.aesthetic}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-600 font-bold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-rose-500" />
                  ระบบความปลอดภัยสูงสุด (Strategic Security)
                </span>
                <span className="font-extrabold text-rose-600">{selectedProperty.specs.security}%</span>
              </div>
              <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 to-rose-400 transition-all duration-1000"
                  style={{ width: `${selectedProperty.specs.security}%` }}
                />
              </div>
            </div>
          </div>

          {/* รายการจุดตรวจวัด */}
          <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">สเปกพิเศษผ่านเกณฑ์พรีเมียม:</h4>
            {selectedProperty.highlights.map((item, index) => (
              <div key={index} className="flex gap-2.5 text-xs text-slate-600 items-start leading-relaxed">
                <CornerDownRight className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* ปุ่มและราคาประเมิน */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">ราคาโดย วริศรา</span>
              <span className="block text-xl font-black text-amber-600">{selectedProperty.price}</span>
            </div>
            <a 
              href="#schedule-section"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-xs font-bold text-amber-700 transition-all border border-amber-200/50"
            >
              <Calendar className="w-4 h-4" />
              จองสิทธิ์เข้าชมส่วนตัว
            </a>
          </div>
        </div>

        {/* ระบบวิดีโอแสดงมุมมองเสมือนจริง (Cyber Virtual Tour Camera Console) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600 mb-1">Aura Inspection Terminal</p>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">กล้องตรวจสอบสถาปัตยกรรมระดับสูง (Virtual View)</h2>
            </div>
            {/* สลับมุมกล้องในการชม */}
            <div className="flex gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 self-start sm:self-auto">
              {(['Normal', 'Thermal', 'Blueprint'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setTourMode(mode);
                    triggerNotification(`เปลี่ยนมุมมองกล้องตรวจสอบเป็น: ${mode}`);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    tourMode === mode 
                      ? 'bg-amber-500 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* ตัวเครื่องเล่นวิดีโอจำลอง (Virtual Canvas Playback) */}
          <div className="relative rounded-[2rem] overflow-hidden border border-stone-200 bg-slate-900 aspect-video shadow-[0_15px_40px_rgba(0,0,0,0.1)]">
            
            {/* เลเยอร์ครอบฟิลเตอร์กล้องตรวจจับ (Normal / Thermal / Blueprint Filter UI) */}
            <div className="absolute inset-0 z-10 pointer-events-none transition-all duration-500">
              {tourMode === 'Thermal' && (
                <div className="w-full h-full bg-gradient-to-tr from-amber-900/50 via-rose-900/30 to-yellow-500/20 mix-blend-color-dodge animate-pulse" />
              )}
              {tourMode === 'Blueprint' && (
                <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[length:100%_4px,_6px_100%] opacity-80 mix-blend-overlay" />
              )}
            </div>

            {/* แหล่งภาพถ่ายจำลองวิดีโอสำรวจโดรนลอยฟ้า */}
            <div className="w-full h-full relative">
              <img 
                src={selectedProperty.image} 
                alt="วิดีโอสำรวจคฤหาสน์หรู" 
                className={`w-full h-full object-cover transition-all duration-700 ${
                  tourMode === 'Thermal' ? 'contrast-150 saturate-200 hue-rotate-60 brightness-90' : ''
                } ${
                  tourMode === 'Blueprint' ? 'grayscale contrast-200 opacity-30 brightness-50' : ''
                } ${isVideoPlaying ? 'scale-105 duration-1000' : 'scale-100'}`}
              />

              {/* ข้อความประกอบเมื่อสลับเป็นโหมดวิศวกรรม Blueprint */}
              {tourMode === 'Blueprint' && (
                <div className="absolute inset-0 flex flex-col justify-between p-8 z-15 text-amber-400 font-mono text-[10px] leading-relaxed">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p>PROJECT_REF: {selectedProperty.id.toUpperCase()}</p>
                      <p>RESOLUTION: 4K ULTRA UHD</p>
                      <p>LATITUDE: 13.7563° N, 100.5018° E</p>
                    </div>
                    <div className="text-right">
                      <p className="animate-pulse text-amber-300">▲ STABLE STRUCTURAL ANALYSIS</p>
                      <p>AESTHETIC INDEX: FLUSH (10.0)</p>
                    </div>
                  </div>
                  
                  {/* กล่องวิศวกรรมสั่นไหวแบบสแกนเรียลไทม์ */}
                  <div className="w-full h-24 border border-amber-500/30 border-dashed rounded-xl flex items-center justify-center bg-amber-950/20 backdrop-blur-sm relative">
                    <Workflow className="w-8 h-8 text-amber-500/80 animate-spin" />
                    <span className="absolute bottom-2 right-3 text-[9px]">REAL-TIME SCANNING ACTIVE</span>
                  </div>

                  <div className="flex justify-between items-center text-amber-500">
                    <p>ระบบตรวจจับสัดส่วนทองคำธรรมชาติ (Golden Ratio Standard Checked)</p>
                    <p>สแกนความสมบูรณ์: {Math.floor(scanProgress)}%</p>
                  </div>
                </div>
              )}

              {/* ปลั๊กอินควบคุมเครื่องเล่นเสียงเสมือนจริงของวิดีโอ */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 shadow-lg flex justify-between items-center text-slate-800">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setIsVideoPlaying(!isVideoPlaying);
                      triggerNotification(isVideoPlaying ? 'หยุดภาพสำรวจชั่วคราว' : 'เปิดภาพเคลื่อนไหวบินโดรนเสมือนจริง');
                    }}
                    className="p-2.5 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <div className="hidden sm:block">
                    <p className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      {isVideoPlaying ? 'กำลังสำรวจมุมมองรอบพื้นที่จริง' : 'หยุดสำรวจเพื่อพิจารณาโครงสร้าง'}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold">ระบบกล้องตรวจประเมินระดับลักชัวรี</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* การจำลองเส้นเสียงสุนทรียภาพ */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <div 
                        key={bar} 
                        className={`w-[2px] bg-amber-500 transition-all duration-300 ${
                          isVideoPlaying && !isMuted ? 'h-3' : 'h-1'
                        }`} 
                        style={{
                          animation: isVideoPlaying && !isMuted ? `bounce 0.5s ease-in-out infinite alternate ${bar * 0.1}s` : 'none'
                        }}
                      />
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      setIsMuted(!isMuted);
                      triggerNotification(isMuted ? 'เปิดเสียงสุนทรียศาสตร์ของสถานที่' : 'ปิดเสียงเพื่อเน้นวิชาการ');
                    }}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-600 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* โปรโตคอลการตรวจเช็กเพื่อความสมบูรณ์แบบ (The Perfection Protocol Checkbox) */}
      <section className="bg-stone-50 border-t border-stone-200/80 py-24 relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* ซ้าย: วาริศรา การันตีคุณภาพความงาม */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-500">Varisara's Personal Guarantee</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">โปรโตคอล <br />ความสมบูรณ์แบบสูงสุด</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              ไม่มีคำว่า "พอใช้ได้" ในพจนานุกรมการเลือกซื้อคฤหาสน์ของเรา ทุกโครงการต้องผ่านการตรวจเช็กระบบโครงสร้าง สถาปัตยกรรม และวิเคราะห์ทางสิ่งแวดล้อมมากกว่า 150 ข้อ เพื่อให้ออกมาสมบูรณ์แบบที่สุดตามมาตรฐานของคุณวริศรา
            </p>
            
            {/* กราฟประเมินผลอย่างเป็นทางการ */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-rose-400 flex items-center justify-center text-white font-black text-sm shadow-md">
                100%
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase">ใบรับรองอย่างเป็นทางการตลอดชีพ</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">รวมถึงการรับประกันงานสถาปัตย์และทีมงานบัตเลอร์ประสานงานส่วนบุคคล</p>
              </div>
            </div>
          </div>

          {/* ขวา: เช็คลิสต์ตรวจสอบและตรวจวัดความพร้อมที่โต้ตอบได้จริง */}
          <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-3xl p-8 space-y-4 shadow-[0_10px_35px_rgba(0,0,0,0.02)]">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-amber-500" />
              รายงานการประเมินสภาพสถาปัตยกรรมระดับซูเปอร์ลักชัวรี
            </h3>

            <div className="space-y-3.5">
              {[
                { id: 'p1', title: 'การตรวจสอบสัดส่วนแสงแดดตามธรรมชาติสาดส่อง 4 ทิศทาง', desc: 'ต้องไม่สร้างจุดสะท้อนความร้อนเข้าสู่ห้องนอนหลักในช่วงบ่าย' },
                { id: 'p2', title: 'ระบบกรองอากาศ 5 ชั้น ควบคุมแรงดันและปริมาณออกซิเจนบริสุทธิ์', desc: 'รับประกันความสดชื่นและป้องกันฝุ่น PM 2.5 ครบถ้วน 100%' },
                { id: 'p3', title: 'รอยต่อหินอ่อนแผ่นพื้นไร้ตะเข็บ (Marble Book-matching)', desc: 'หินนำเข้าจากอิตาลีลวดลายต้องต่อเนื่องกันไม่ขัดสายตาแม้มิลลิเมตรเดียว' },
                { id: 'p4', title: 'ความทนทานต่อแรงแผ่นดินไหวสูงสุดและการก่อสร้างไร้เสากลางห้อง', desc: 'เพื่อทัศนียภาพกว้างไกลแบบพาโนรามารอบทิศอย่างสมบูรณ์แบบที่สุด' },
                { id: 'p5', title: 'การประเมินทิศทางลมตามหลักพฤกษศาสตร์และศาสตร์ฮวงจุ้ยชั้นสูง', desc: 'คัดกรองพลังงานบวก พัดพาความเจริญรุ่งเรืองและสุขภาพดีมาให้ครอบครัว' }
              ].map((p) => (
                <div 
                  key={p.id}
                  onClick={() => {
                    toggleProtocol(p.id);
                    triggerNotification(checkedProtocols[p.id] ? `ปิดการตรวจสอบ: ${p.title}` : `ตรวจสอบผ่านเกณฑ์: ${p.title}`);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    checkedProtocols[p.id] 
                      ? 'bg-amber-500/5 border-amber-400' 
                      : 'bg-stone-50/50 border-stone-200 hover:border-amber-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all mt-0.5 ${
                    checkedProtocols[p.id] 
                      ? 'bg-amber-500 border-amber-500 text-white' 
                      : 'border-stone-300 bg-white'
                  }`}>
                    {checkedProtocols[p.id] && <CheckCircle2 className="w-4 h-4 stroke-[3px]" />}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold transition-colors ${checkedProtocols[p.id] ? 'text-amber-700' : 'text-slate-800'}`}>
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* แกลเลอรี่ไฮไลท์สถาปัตยกรรมระดับโลก (Premium Visual Gallery Showcase) */}
      <section className="bg-white py-24 border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Crafting Masterpieces</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">ความสุนทรีย์อันล้ำค่าในทุกจุดชมวิว</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              คัดสรรและประเมินอย่างละเมียดละไมเพื่อให้ภาพถ่ายทุกมุมคือศิลปะชั้นเลิศที่คู่ควรกับความสำเร็จอันยิ่งใหญ่ของท่าน
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'ความสอดรับของแสงตะวัน', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600' },
              { title: 'พื้นอ่างออนเซ็นสปาส่วนตัว', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600' },
              { title: 'บันไดลอยเกลียวทองคำ', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=600' },
              { title: 'สระว่ายน้ำกระจกไร้ขอบล้น', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' }
            ].map((g, i) => (
              <div key={i} className="group relative h-72 rounded-3xl overflow-hidden border border-stone-200 cursor-pointer shadow-sm">
                <img 
                  src={g.img} 
                  alt={g.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="text-[10px] uppercase tracking-widest text-amber-200 font-bold">DETAIL_0{i+1}</p>
                  <h4 className="text-xs font-bold text-white mt-1">{g.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* แบบฟอร์มลงทะเบียนระดับเอ็กซ์คลูซีฟ (Exclusive Appointment Booking Form) */}
      <section id="schedule-section" className="relative py-24 bg-stone-100/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] border border-amber-400/40 p-8 md:p-12 shadow-[0_15px_45px_rgba(245,158,11,0.06)] relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl" />

            <div className="text-center space-y-4 mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                รับสิทธิ์เข้าถึงพอร์ตโฟลิโอลับเฉพาะ
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">ลงทะเบียนเข้าเยี่ยมชมแบบส่วนตัว</h2>
              <p className="text-slate-500 text-xs md:text-sm max-w-lg mx-auto">
                นัดหมายระดับซูเปอร์พรีเมียม สัมผัสการต้อนรับด้วยผู้ดูแลส่วนตัวที่ผ่านการเทรนอย่างประณีต พร้อมบริการรับ-ส่งเพื่อเข้าชมผลงานจริง
              </p>
            </div>

            {bookingConfirmed ? (
              <div className="py-12 text-center space-y-6 animate-fade-in-down">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10 text-white stroke-[2.5]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-amber-600">จองสิทธิ์ระดับพิเศษเสร็จสิ้น</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    ขอบคุณ คุณ <strong className="text-slate-950 font-bold">{clientName}</strong> สำหรับเกียรติยศในการลงทะเบียนครั้งนี้ ทางเลขานุการส่วนตัวของคุณวริศราจะติดต่อกลับไปประสานงานทันทีผ่านเบอร์โทร <strong className="text-slate-950 font-bold">{clientPhone}</strong>
                  </p>
                </div>
                <button 
                  onClick={() => setBookingConfirmed(false)}
                  className="px-6 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-bold text-slate-700"
                >
                  ลงทะเบียนเพิ่มสำหรับผู้รับสิทธิ์ร่วม
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* ชื่อนามสกุลผู้ลงทะเบียน */}
                  <div className="space-y-2">
                    <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-500" />
                      ชื่อ-นามสกุล ของท่าน (เพื่อระบุลงบัตรเชิญวีไอพี)
                    </label>
                    <input 
                      type="text" 
                      placeholder="เช่น คุณกิตติพัฒน์ อัครมหาเศษฐี" 
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900 transition-all font-semibold"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                    />
                  </div>

                  {/* เบอร์โทรศัพท์ระดับความปลอดภัยสูง */}
                  <div className="space-y-2">
                    <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-500" />
                      เบอร์โทรศัพท์ติดต่อส่วนตัว (สายตรงสำหรับบัตเลอร์)
                    </label>
                    <input 
                      type="tel" 
                      placeholder="เช่น 089-123-4567" 
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900 transition-all font-semibold"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* วันที่ระบุ */}
                  <div className="space-y-2">
                    <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      กำหนดวันที่ประสงค์เยี่ยมชมคฤหาสน์จริง
                    </label>
                    <input 
                      type="date" 
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900 transition-all font-semibold"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* เวลาที่ระบุ */}
                  <div className="space-y-2">
                    <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      ช่วงเวลาอันเหมาะสมเพื่อทำการติดต่อกลับ
                    </label>
                    <select 
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900 transition-all font-semibold cursor-pointer"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                    >
                      <option value="">เลือกเวลาระหว่างวันของท่าน...</option>
                      <option value="09:00 - 11:30">ช่วงเช้าอันสว่างไสว (09:00 - 11:30 น.)</option>
                      <option value="13:00 - 15:30">ช่วงบ่ายอันสงบเงียบ (13:00 - 15:30 น.)</option>
                      <option value="16:00 - 18:30">ยามพระอาทิตย์อัสดงกึ่งรับลม (16:00 - 18:30 น.)</option>
                      <option value="20:00 - 22:00">ความลับยามค่ำคืน (20:00 - 22:00 น.)</option>
                    </select>
                  </div>
                </div>

                {/* แถบการันตีสิทธิ์และความเป็นส่วนตัวสูงสุด */}
                <div className="flex gap-3 text-[11px] text-slate-500 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <Shield className="w-5 h-5 text-amber-500 shrink-0" />
                  <p className="leading-relaxed font-semibold">
                    ข้อมูลประวัติของท่านทั้งหมดจะถูกจัดเก็บเป็นความลับสุดยอดระดับธนาคารสวิสเซอร์แลนด์ และจำกัดขอบข่ายการเข้าถึงเพื่อมอบความเป็นส่วนตัวขั้นสูงสุดให้ครอบครัวของท่านอย่างมั่นคง
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-rose-400 text-white font-black text-sm uppercase tracking-widest shadow-[0_5px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.4)] transition-all duration-300 hover:scale-[1.01]"
                >
                  ยืนยันสิทธิ์นัดหมายกับเลขาฯ ส่วนตัว
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ท้ายหน้าเว็บดีไซน์สว่างสง่างาม (Elegant Light Footer) */}
      <footer className="bg-white border-t border-stone-200/80 py-16 text-center space-y-6 text-xs text-slate-500 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex justify-center items-center gap-3">
            <Compass className="w-6 h-6 text-amber-500" />
            <span className="text-base font-black tracking-widest bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">VARISARA AURA PROPERTY CO., LTD</span>
          </div>
          <p className="max-w-md mx-auto text-[11px] text-slate-400 leading-relaxed font-semibold">
            อาคาร วริศรา ออร่า ทาวเวอร์ ชั้น 88 ถนนสุขุมวิท กรุงเทพมหานคร 10110 <br />
            โทร: 02-LUXE-AURA | อีเมล: private@varisara-aura.luxury
          </p>
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-semibold">
            <p>© {new Date().getFullYear()} VARISARA AURA. การออกแบบและคัดสรรทั้งหมดถือเป็นลิขสิทธิ์ของบริษัทวริศราจำกัดแต่เพียงผู้เดียว</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-500 transition-colors">นโยบายสิทธิ์ความเป็นส่วนตัว</a>
              <a href="#" className="hover:text-amber-500 transition-colors">ข้อตกลงการคัดเลือกโครงการ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}