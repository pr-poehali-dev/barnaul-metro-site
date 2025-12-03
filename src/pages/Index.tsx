import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isDark, setIsDark] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 300);

      const sections = ['home', 'map', 'news', 'stations', 'reviews', 'contacts'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const stations = [
    {
      id: 1,
      name: "Парковая",
      image: "https://cdn.poehali.dev/files/669a06a3-21aa-473a-a334-36cbaa978cc8.jpeg",
      description: "Главная станция метрополитена с современной архитектурой",
      rating: 4.8,
      reviews: 234
    },
    {
      id: 2,
      name: "Площадь Победы",
      image: "https://cdn.poehali.dev/projects/4ab61608-89a4-4de5-b221-e8a3af2a1001/files/b1304c06-353c-44fa-9ff1-c4d9f3864e48.jpg",
      description: "Историческая станция с инновационными технологиями",
      rating: 4.6,
      reviews: 189
    },
    {
      id: 3,
      name: "ТЦ Россия",
      image: "https://cdn.poehali.dev/files/e5ff9262-7a70-4bcc-87a7-2d4a1cca7843.jpeg",
      description: "Футуристичная станция в деловом районе",
      rating: 4.9,
      reviews: 312
    }
  ];

  const news = [
    {
      id: 1,
      title: "Запуск новой линии метро",
      date: "2024-12-01",
      type: "info",
      description: "С 15 декабря начнет работу новая ветка, соединяющая центр с северными районами"
    },
    {
      id: 2,
      title: "Задержка на линии 2",
      date: "2024-12-03",
      type: "warning",
      description: "Технические работы на станции Площадь Победы. Ожидаемое время: 30 минут"
    },
    {
      id: 3,
      title: "Новая система оплаты",
      date: "2024-11-28",
      type: "info",
      description: "Внедрена бесконтактная оплата проезда через мобильное приложение"
    }
  ];

  const reviews = [
    {
      id: 1,
      author: "Алексей М.",
      station: "Центральная",
      rating: 5,
      text: "Потрясающая станция! Чистота, современный дизайн и отличная навигация.",
      date: "2024-11-30"
    },
    {
      id: 2,
      author: "Мария К.",
      station: "Технопарк",
      rating: 5,
      text: "Очень удобное расположение, быстрая пересадка. Футуристичный интерьер впечатляет!",
      date: "2024-11-29"
    },
    {
      id: 3,
      author: "Дмитрий С.",
      station: "Площадь Победы",
      rating: 4,
      text: "Хорошая станция, но иногда бывают задержки в часы пик.",
      date: "2024-11-28"
    }
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background" style={{ backgroundImage: 'url(https://cdn.poehali.dev/files/0affefa9-6de1-466c-9108-4cfad99d6bee.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
      <nav className="fixed top-1 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow">
                <Icon name="Train" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-glow">МЕТРО БАРНАУЛА</h1>
            </div>
            <div className="hidden md:flex gap-6 items-center">
              {[
                { id: "home", label: "Главная", icon: "Home" },
                { id: "map", label: "Карта", icon: "Map" },
                { id: "news", label: "Новости", icon: "Newspaper" },
                { id: "stations", label: "Станции", icon: "MapPin" },
                { id: "reviews", label: "Отзывы", icon: "MessageSquare" },
                { id: "contacts", label: "Контакты", icon: "Phone" }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:bg-primary/20 ${
                    activeSection === item.id ? "text-primary glow" : "text-muted-foreground"
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-4"
              >
                <Icon name={isDark ? "Sun" : "Moon"} size={20} />
              </Button>
            </div>
            <div className="flex md:hidden gap-2 items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
              >
                <Icon name={isDark ? "Sun" : "Moon"} size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-lg"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative h-full flex flex-col items-center justify-center gap-6 p-8">
            {[
              { id: "home", label: "Главная", icon: "Home" },
              { id: "map", label: "Карта", icon: "Map" },
              { id: "news", label: "Новости", icon: "Newspaper" },
              { id: "stations", label: "Станции", icon: "MapPin" },
              { id: "reviews", label: "Отзывы", icon: "MessageSquare" },
              { id: "contacts", label: "Контакты", icon: "Phone" }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl text-xl font-medium transition-all w-full max-w-xs ${
                  activeSection === item.id 
                    ? "bg-primary text-primary-foreground glow" 
                    : "bg-card hover:bg-card/80"
                }`}
              >
                <Icon name={item.icon as any} size={24} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-secondary text-secondary-foreground glow-purple">
                Будущее уже здесь
              </Badge>
              <h2 className="text-5xl md:text-7xl font-bold leading-tight text-glow">
                Метро нового поколения
              </h2>
              <p className="text-xl text-muted-foreground">
                Современная транспортная система с передовыми технологиями и комфортом
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="glow"
                  onClick={() => scrollToSection("map")}
                >
                  <Icon name="Map" className="mr-2" size={20} />
                  Посмотреть карту
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection("stations")}
                >
                  Станции
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <img 
                src="https://cdn.poehali.dev/projects/4ab61608-89a4-4de5-b221-e8a3af2a1001/files/c191c9f9-de97-46da-9117-cdeae115f670.jpg"
                alt="Метро Барнаула"
                className="rounded-2xl shadow-2xl glow"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl border border-border glow">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Zap" className="text-primary" size={32} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">99.8%</p>
                    <p className="text-sm text-muted-foreground">Пунктуальность</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="map" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-primary text-primary-foreground">Интерактивная карта</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Схема метрополитена</h2>
            <p className="text-xl text-muted-foreground">Планируйте маршрут с умной навигацией</p>
          </div>
          <Card className="overflow-hidden border-2 border-primary/20 glow">
            <CardContent className="p-0">
              <img 
                src="https://cdn.poehali.dev/files/f6b6d492-0172-4ecf-8ea7-cfdb7aec7493.jpeg"
                alt="Карта метро"
                className="w-full"
              />
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="border-primary/20 hover:border-primary transition-all hover:glow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Icon name="Ticket" className="text-primary" size={24} />
                </div>
                <CardTitle>Единый билет</CardTitle>
                <CardDescription>45 ₽ за поездку</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-secondary/20 hover:border-secondary transition-all hover:glow-purple">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <Icon name="CreditCard" className="text-secondary" size={24} />
                </div>
                <CardTitle>Проездной</CardTitle>
                <CardDescription>1200 ₽ на месяц</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-primary/20 hover:border-primary transition-all hover:glow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Icon name="Smartphone" className="text-primary" size={24} />
                </div>
                <CardTitle>Приложение</CardTitle>
                <CardDescription>Оплата одним касанием</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="news" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">Актуальные уведомления</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow-purple">Новости и обновления</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map(item => (
              <Card 
                key={item.id} 
                className={`border-2 hover:scale-105 transition-all ${
                  item.type === "warning" 
                    ? "border-destructive/50 hover:glow" 
                    : "border-primary/20 hover:border-primary hover:glow"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={item.type === "warning" ? "destructive" : "default"}>
                      <Icon 
                        name={item.type === "warning" ? "AlertTriangle" : "Info"} 
                        className="mr-1" 
                        size={14} 
                      />
                      {item.type === "warning" ? "Внимание" : "Новость"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="stations" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-primary text-primary-foreground">Наши станции</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Фото и описания</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stations.map(station => (
              <Card 
                key={station.id} 
                className="overflow-hidden border-primary/20 hover:border-primary transition-all hover:scale-105 hover:glow"
              >
                <CardContent className="p-0">
                  <img 
                    src={station.image} 
                    alt={station.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{station.name}</h3>
                    <p className="text-muted-foreground mb-4">{station.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={18} />
                        <span className="font-bold">{station.rating}</span>
                        <span className="text-muted-foreground text-sm">({station.reviews})</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="ExternalLink" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">Отзывы пассажиров</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow-purple">Что говорят люди</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(review => (
              <Card key={review.id} className="border-secondary/20 hover:border-secondary hover:glow-purple transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-lg">{review.author}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Icon name="MapPin" size={14} />
                        {review.station}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={14} />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                  <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" className="glow-purple">
              <Icon name="MessageSquarePlus" className="mr-2" size={20} />
              Оставить отзыв
            </Button>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-primary text-primary-foreground">Свяжитесь с нами</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Контакты</h2>
          </div>
          <Card className="border-2 border-primary/20 glow">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Горячая линия</h3>
                      <p className="text-muted-foreground">8-800-555-3456</p>
                      <p className="text-sm text-muted-foreground">Круглосуточно</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-muted-foreground">info@metro-barnaul.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Адрес</h3>
                      <p className="text-muted-foreground">г. Барнаул, пр. Ленина, 45</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-xl mb-4">Социальные сети</h3>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Icon name="Send" className="mr-2" size={20} />
                    Telegram
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Icon name="MessageCircle" className="mr-2" size={20} />
                    ВКонтакте
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Icon name="Share2" className="mr-2" size={20} />
                    Одноклассники
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Метро Барнаула. Будущее начинается здесь.</p>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full shadow-lg glow"
        >
          <Icon name="ArrowUp" size={24} />
        </Button>
      )}
    </div>
  );
};

export default Index;