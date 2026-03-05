import React, { useState, useEffect } from 'react';
import { Sun, Music, User } from 'lucide-react';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [dailySong, setDailySong] = useState("");

  // Danh sách bài hát yêu thích của bạn
  const myPlaylist = [
    "Nấu ăn cho em - Đen Vâu",
    "Making My Way - Sơn Tùng MTP",
    "Waiting For You - MONO",
    "Die With A Smile - Lady Gaga & Bruno Mars"
  ];

  useEffect(() => {
    // 1. Chọn bài hát ngẫu nhiên dựa trên ngày (mỗi ngày 1 bài)
    const today = new Date().getDate();
    const songIndex = today % myPlaylist.length;
    setDailySong(myPlaylist[songIndex]);

    // 2. Lấy dữ liệu thời tiết (Sử dụng API miễn phí Open-Meteo không cần key)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current_weather=true')
      .then(res => res.json())
      .then(data => setWeather(data.current_weather));
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1>My Personal Space</h1>
        <nav>
          <a href="#about" style={styles.navLink}>Giới thiệu</a>
          <a href="#contact" style={styles.navLink}>Liên hệ</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main style={styles.main}>
        <div style={styles.profileCard}>
          <img 
            src="https://via.placeholder.com/150" 
            alt="My Face" 
            style={styles.avatar} 
          />
          <h2>Xin chào, tôi là [Tên của bạn]!</h2>
          <p>Tôi là một người yêu công nghệ và âm nhạc. Chào mừng bạn đến với góc nhỏ của tôi.</p>
        </div>

        {/* Widgets Section */}
        <div style={styles.widgets}>
          <div style={styles.card}>
            <Sun color="#f39c12" />
            <h3>Thời tiết hôm nay</h3>
            {weather ? (
              <p>{weather.temperature}°C - Gió: {weather.windspeed} km/h</p>
            ) : <p>Đang tải...</p>}
          </div>

          <div style={styles.card}>
            <Music color="#e74c3c" />
            <h3>Giai điệu hôm nay</h3>
            <p>"{dailySong}"</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// CSS-in-JS đơn giản
const styles = {
  container: { fontFamily: 'Arial, sans-serif', color: '#333', backgroundColor: '#f9f9f9', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', padding: '1rem 5%', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  navLink: { marginLeft: '20px', textDecoration: 'none', color: '#666' },
  main: { padding: '50px 5%', textAlign: 'center' },
  profileCard: { marginBottom: '40px' },
  avatar: { borderRadius: '50%', width: '150px', height: '150px', border: '4px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  widgets: { display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
  card: { background: '#fff', padding: '20px', borderRadius: '15px', width: '250px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }
};

export default App;