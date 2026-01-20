import { useTranslation } from 'react-i18next';
import {  FiClock, FiExternalLink,  FiTrendingUp, FiUser } from 'react-icons/fi';

const NewsFeedView = () => {
  const { t } = useTranslation();

 
  const newsData = [
    {
      id: 1,
      title: "ABD Başkanı'ndan Kripto Para Düzenlemesi Hakkında Kritik Açıklama",
      description: "Başkan, dijital varlıkların finansal sistemdeki yerini sağlamlaştırmak için yeni bir kararname imzaladı. Piyasalarda olumlu hava esiyor.",
      image: "https://imgs.search.brave.com/r8ryFKZ2qYSJaG8fkm1GaP6il9VuihvamjuuE1aWnGM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE5/MjQyNjQzMy9waG90/by9iYXRoLXVuaXRl/ZC1raW5nZG9tLWlu/LXRoaXMtcGhvdG8t/aWxsdXN0cmF0aW9u/LWEtbm92ZWx0eS1i/aXRjb2luLXRva2Vu/LWlzLXBob3RvZ3Jh/cGhlZC1vbi1hLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1B/LUU0UWQ0bFNBeVRS/SGZyNlNHZnNrZjVh/Qm5JUlphamtvRkR0/NmI4b2NvPQ",
      author: "Beyaz Saray Basın",
      date: "2 Saat Önce",
      isFeatured: true 
    },
    {
      id: 2,
      title: "Bitcoin ETF Başvurularında Rekor Artış: Kurumsal İlgi Büyüyor",
      description: "Dev varlık yönetim şirketleri, spot Bitcoin ETF'leri için sıraya girdi. Onay süreci piyasa hacmini 2 katına çıkarabilir.",
      image: "https://imgs.search.brave.com/fQjxsR3cPtzq2XHgza0uSYTNroBR0rlgZneY4DMWQ5Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIw/MTgyMzY1OC9waG90/by9leGNoYW5naW5n/LWJpdGNvaW4td2l0/aC11bml0ZWQtc3Rh/dGVzLWRvbGxhci1i/aWxsLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1aZ0RSaWEx/RWRBb25GbWoydTlF/bUlGWV95cFNkdVlf/UGNBdDZuaHlFaFVJ/PQ?q=80&w=1000&auto=format&fit=crop",
      author: "Analist ",
      date: "4 Saat Önce",
      isFeatured: false
    },
 {
      id: 3,
      title: "Ethereum Ağında Dev Güncelleme: Gas Ücretleri Düşüyor mu?",
      description: "Beklenen 'Dencun' güncellemesi test ağında başarıyla tamamlandı. Layer-2 çözümlerinde maliyetlerin %90 azalması bekleniyor.",
      image: "https://imgs.search.brave.com/UjMOq4T6AETlqtynI6pfPdvum_O5gA1k7xmdD-sFcQw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM4/OTQ5MzU2Ny9waG90/by9zaWx2ZXItZXRo/ZXJldW0td2l0aC1j/YW5kbGUtc3RpY2st/Z3JhcGgtY2hhcnQt/YW5kLWRpZ2l0YWwt/YmFja2dyb3VuZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/dnMwNENpZ3BYQXk2/ZV9haFZBSEc0QUw3/cFI3WVBWOXBid1dt/SHBrMkNSUT0?q=80&w=1000&auto=format&fit=crop",
      category: "Teknoloji",
      author: "Blockchain",
      date: "6 Saat Önce",
      isFeatured: false
    },
    {
      id: 4,
      title: "Merkez Bankası Dijital Para Birimi (CBDC) Pilot Süreci Başladı",
      description: "Avrupa Merkez Bankası, dijital Euro için pilot uygulamalara başladığını duyurdu. Gizlilik odaklı testler ön planda.",
      image: "https://imgs.search.brave.com/_V7AXxsdeOwtXynqnRaiDp3uRaRCR-guMvA6zBbgMic/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kaXBs/by1tZWRpYS5zMy5l/dS1jZW50cmFsLTEu/YW1hem9uYXdzLmNv/bS8yMDI0LzA1L2Nl/bnRyYWwtYmFuay1k/aWdpdGFsLWN1cnJl/bmN5LWV1cm9wZWFu/LXVuaW9uLTEwMjR4/NTg1LmpwZw?q=80&w=1000&auto=format&fit=crop",
      author: " TimesCrypto",
      date: "1 Gün Önce",
      isFeatured: false
    },
    {
      id: 5,
      title: "Madencilik Şirketleri Yeşil Enerjiye Geçiş Yapıyor",
      description: "Kripto madencilik tesislerinin %60'ı artık yenilenebilir enerji kaynaklarını kullanıyor. Sürdürülebilirlik raporu yayınlandı.",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.cnbce.com%2F2%2F1280%2F720%2Fstorage%2Ffiles%2Fimages%2F2024%2F10%2F07%2Fmaden-sirketi-rio-tinto-dort-kitadaki-lityum-madenlerine-erisim-saglayabilir-ypfr.jpg&f=1&nofb=1&ipt=b358d7a8353e5409b41d0b5acc9098fa5ab8e4ebc228e0d43ea544ecf8e19d90=80&w=1000&auto=format&fit=crop",
      author: " SNTV",
      date: "1 Gün Önce",
      isFeatured: false
    },
    {
      id: 6,
      title: "Küresel Piyasalar Enflasyon Verilerini Bekliyor",
      description: "Merkez bankalarının faiz kararı öncesinde piyasalarda durgunluk hakim. Yatırımcılar güvenli liman arayışında altına yöneldi.",
      image: "https://imgs.search.brave.com/_mqZfNudY7B8gflyoxX9WSh09mwOgz-oLbKUDjDlRHo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWJjLmNvbS91cGxv/YWQvcG9ydGFsLzIw/MjUwODIwLzE5MzRk/MDc5YjM3YWRjZDQy/OWEwNTMxZTE1ZmM1/NTI4LmpwZw?q=80&w=1000&auto=format&fit=crop",
      author: "DNN",
      date: "5 Saat Önce",
      isFeatured: false
    },
    {
      id: 7,
      title: "SEC Başkanı: 'Çoğu Altcoin Menkul Kıymet Statüsünde'",
      description: "SEC'den gelen son açıklama piyasada satış baskısı yarattı. Kurum, borsaların listelediği varlıklar için daha sıkı denetim sinyali verdi.",
      image: "https://imgs.search.brave.com/ChEl3oZcg10VZUrip-bxtr5NlkF4iVDVCrdFWay0IBQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Yml0Y29pbnNpc3Rl/bWkuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIzLzA3L3Nl/Yy1nYXJ5LWdlbnNs/ZXItNjk2eDQ2My5q/cGcud2VicA?q=80&w=1000&auto=format&fit=crop",
      author: "Geckon",
      date: "4 Saat Önce",
      isFeatured: false
    },
  ];

  const featuredNews = newsData.find(n => n.isFeatured);
  const otherNews = newsData.filter(n => !n.isFeatured);

  return (
    <div className="min-h-screen pt-8 pb-12 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in select-none font-inter">
      
      {/* header*/}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-bold text-yellow-400 tracking-widest uppercase">Canlı Akış</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
             <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">Son Haberler</span>
          </h1>
        </div>
      </div>

      {/* manset haber*/}
      {featuredNews && (
        <div className="mb-10 group relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
          
          {/* Resim */}
          <img 
            src={featuredNews.image} 
            alt={featuredNews.title} 
            className="w-full h-100 md:h-125 object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* İçerik */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 bg-linear-to-t from-black via-black/80 to-transparent">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-gray-300 text-xs font-medium flex items-center gap-1 bg-black/50 px-2 py-1 rounded-lg backdrop-blur-sm">
                <FiClock /> {featuredNews.date}
              </span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3 leading-tight group-hover:text-yellow-400 transition-colors duration-300 drop-shadow-lg">
              {featuredNews.title}
            </h2>
            
            <p className="text-gray-300 text-sm md:text-lg max-w-3xl mb-6 line-clamp-2 md:line-clamp-none leading-relaxed">
              {featuredNews.description}
            </p>

            <button className="flex items-center gap-2 bg-white/10 hover:bg-yellow-400 hover:text-black border border-white/20 hover:border-yellow-400 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 backdrop-blur-md cursor-pointer">
              Haberi Oku <FiExternalLink />
            </button>
          </div>
        </div>
      )}

      {/* Diğer Haberler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherNews.map((news) => (
          <div 
            key={news.id} 
            className="group glass-card flex flex-col bg-[#0a0a0a]/60 border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-400/30 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Resim Alanı */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={news.image} 
                alt={news.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
            </div>

            {/* İçerik Alanı */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3 font-medium">
                <span className="flex items-center gap-1 text-yellow-500/80"><FiUser /> {news.author}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                <span className="flex items-center gap-1"><FiClock /> {news.date}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-yellow-400 transition-colors line-clamp-2">
                {news.title}
              </h3>

              <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed flex-1">
                {news.description}
              </p>

              {/* Alt Buton */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <button className="text-xs font-bold text-yellow-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer group/btn">
                  Devamını Oku 
                  <FiExternalLink className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
                <div className="p-1.5 rounded-full bg-white/5 text-gray-400 group-hover:text-yellow-400 transition-colors">
                   <FiTrendingUp size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default NewsFeedView;