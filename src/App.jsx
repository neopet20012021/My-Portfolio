import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Send, Code, BookOpen, User, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

// --- GIẢ LẬP CMS DATA (Bạn có thể fetch từ Firebase/Strapi tại đây) ---
const CMS_DATA = {
  projects: [
    { id: 1, title: "E-Commerce App", tech: "React, Node.js", desc: "Hệ thống bán hàng fullstack." },
    { id: 2, title: "AI Chatbot", tech: "Python, OpenAI", desc: "Tích hợp GPT vào giao diện React." }
  ],
  blogs: [
    { id: 1, title: "Cách tối ưu React Performance", date: "2024-10-20", summary: "Chia sẻ về useMemo và useCallback." },
    { id: 2, title: "Hành trình năm 4 IT", date: "2024-11-05", summary: "Những gì mình học được trước khi ra trường." }
  ]
};

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const form = useRef();

  // 1. Dark/Light Mode Logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // 2. Email Automation Logic (Dùng EmailJS)
  const sendEmail = (e) => {
    e.preventDefault();
    // Thay các ID bên dưới bằng ID từ tài khoản EmailJS của bạn
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then(() => alert("Tin nhắn đã được gửi thành công!"), 
            (error) => alert("Lỗi: " + error.text));
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/70 dark:bg-slate-900/70">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">DevPortfolio.</h1>
        <div className="flex items-center gap-6">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-slate-200 dark:bg-slate-800">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-medium">Sắp tốt nghiệp Cử nhân IT</span>
          <h2 className="text-5xl md:text-7xl font-extrabold mt-6 mb-4">Chào, mình là <span className="text-blue-500">Nguyễn Văn A</span></h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
            Mình đam mê xây dựng các sản phẩm web có tính mở rộng cao và trải nghiệm người dùng tinh tế.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">Tải CV ngay</button>
            <button className="px-8 py-3 border border-slate-300 dark:border-slate-700 rounded-lg font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition">GitHub</button>
          </div>
        </motion.div>
      </section>

      {/* --- TECH STACK SHOWDOWN --- */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 flex items-center gap-2"><Code className="text-blue-500" /> Kỹ năng chuyên môn</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['React', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind', 'TypeScript', 'AWS', 'Git'].map(skill => (
              <div key={skill} className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors cursor-default">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BLOG SECTION (Dữ liệu từ CMS) --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 flex items-center gap-2"><BookOpen className="text-blue-500" /> Blog & Chia sẻ</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {CMS_DATA.blogs.map(post => (
              <article key={post.id} className="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition">
                <p className="text-sm text-blue-500 mb-2">{post.date}</p>
                <h4 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition">{post.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{post.summary}</p>
                <button className="mt-4 font-semibold flex items-center gap-1 text-sm italic">Đọc thêm <ExternalLink size={14}/></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT FORM --- */}
      <section className="py-20 bg-blue-600 text-white px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Bạn có dự án mới?</h3>
          <p className="mb-10 opacity-80">Hãy để lại lời nhắn, mình sẽ phản hồi trong vòng 24h qua email tự động.</p>
          <form ref={form} onSubmit={sendEmail} className="space-y-4 text-left">
            <input type="text" name="user_name" placeholder="Tên của bạn" className="w-full p-4 rounded-lg bg-white text-slate-900 outline-none" required />
            <input type="email" name="user_email" placeholder="Email liên hệ" className="w-full p-4 rounded-lg bg-white text-slate-900 outline-none" required />
            <textarea name="message" rows="4" placeholder="Nội dung công việc..." className="w-full p-4 rounded-lg bg-white text-slate-900 outline-none" required></textarea>
            <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition flex justify-center items-center gap-2">
              Gửi đi <Send size={18} />
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default App;