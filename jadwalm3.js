    // Clock functionality
    function updateClock() {
      const now = new Date();
      const hari = now.toLocaleDateString('id-ID', { weekday: 'long' });
      const tanggal = now.getDate();
      const bulan = now.toLocaleDateString('id-ID', { month: 'long' });
      const tahun = now.getFullYear();
      const jam = now.getHours().toString().padStart(2, '0');
      const menit = now.getMinutes().toString().padStart(2, '0');
      const detik = now.getSeconds().toString().padStart(2, '0');

      document.getElementById('tanggal').textContent = `${hari}, ${tanggal} ${bulan} ${tahun}`;
      document.getElementById('jam').textContent = `${jam}:${menit}:${detik}`;
    }

    setInterval(updateClock, 1000);
    updateClock();

    // Data
    const data = {
      1: { 
        seragam: "OSIS", 
        jadwal: "INF, B.IND, DPK, KKA, IPAS", 
        piket: "Yahya, Azmi, Novi, Sofia, Nanda, Nunik, Reni",
        status: "Hari aktif"
      },
      2: { 
        seragam: "Identitas", 
        jadwal: "SI, PPKN, IPAS, B.ING, BK, DPK", 
        piket: "Auladi, Arka, Raa, Fitri, Mutia. Keysa, Zahra",
        status: "Hari aktif"
      },
      3: { 
        seragam: "Batik", 
        jadwal: "B.IND, B.ING, INF, IPAS, SB", 
        piket: "Gibran, Bayu, Selva, Yumna, chika, Tasya, Olifia",
        status: "Hari aktif"
      },
      4: { 
        seragam: "OSIS", 
        jadwal: "DPK, MTK, PJOK, BJ, MTK", 
        piket: "Feriza, Galih, Alya, Aini, Cata, Muza, Cipta",
        status: "Hari aktif"
      },
      5: { 
        seragam: "Pramuka", 
        jadwal: "PABP, DPK", 
        piket: "Fais, Latifa, Ayuk, Fitri, Lia, Felisa",
        status: "Hari aktif"
      },
      0: { 
        seragam: "Libur", 
        jadwal: "Tidak ada jadwal", 
        piket: "Tidak ada piket",
        status: "Hari libur"
      },
      6: { 
        seragam: "Libur", 
        jadwal: "Tidak ada jadwal", 
        piket: "Tidak ada piket",
        status: "Hari libur"
      }
    };

    let hariIni = new Date().getDay();
    let info = data[hariIni] || { seragam: "-", jadwal: "-", piket: "-", status: "-" };

    // Display warning info
    document.getElementById("seragam-info").textContent = info.seragam;
    document.getElementById("jadwal-info").textContent = info.jadwal;
    document.getElementById("piket-info").textContent = info.piket;
    document.getElementById("status-info").textContent = info.status;

    // Tab navigation
    document.querySelectorAll('.nav-tabs a').forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all tabs
        document.querySelectorAll('.nav-tabs a').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Scroll to target
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Scroll to top
    document.querySelector('.scroll-top').addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show/hide scroll
    window.addEventListener('scroll', function() {
      const scrollTop = document.querySelector('.scroll-top');
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / documentHeight) * 100;
      
      // Update progress bar
      document.querySelector('.progress-bar').style.width = `${scrollPercentage}%`;
      
      // Show/hide scroll to top button
      if (scrollPosition > 300) {
        scrollTop.classList.add('show');
      } else {
        scrollTop.classList.remove('show');
      }
      
      // Highlight current day in navigation
      const days = document.querySelectorAll('.schedule-day');
      let currentDay = '';
      
      days.forEach(day => {
        const rect = day.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentDay = day.id;
        }
      });
      
      document.querySelectorAll('.nav-tabs a').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('href') === `#${currentDay}`) {
          tab.classList.add('active');
        }
      });
    });

    // Highlight current time in schedule
    function highlightCurrentTime() {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes
      
      document.querySelectorAll('table tr').forEach(row => {
        const timeCell = row.cells[1];
        if (timeCell && timeCell.textContent.includes('-')) {
          const [start, end] = timeCell.textContent.split('-');
          const [startHour, startMinute] = start.split(':').map(Number);
          const [endHour, endMinute] = end.split(':').map(Number);
          
          const startTime = startHour * 60 + startMinute;
          const endTime = endHour * 60 + endMinute;
          
          if (currentTime >= startTime && currentTime <= endTime) {
            row.classList.add('current-time');
          } else {
            row.classList.remove('current-time');
          }
        }
      });
    }
    
    setInterval(highlightCurrentTime, 60000); // Update every minute
    highlightCurrentTime(); // Initial call
    
    // Add current day highlight
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const todayName = dayNames[hariIni];
    const todayElement = document.getElementById(todayName);
    if (todayElement) {
      todayElement.classList.add('current-day');
}
