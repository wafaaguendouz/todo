import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.scss';
import Upcoming from './pages/Upcoming.tsx';
import Home from './pages/Home/Home.tsx';
import Today from './pages/Today.tsx';
import List from './components/List';
import StickyWall from './pages/StickyWall/StickyWall.tsx';
import { ThemeContext } from './contexts/ThemeContext.tsx';
import { TaskProvider } from './contexts/TaskContext.tsx';
import { TaskCategoryProvider } from './contexts/TaskCategoryContext.tsx';
import { StickyWallProvider } from './contexts/StickyWallContext.tsx';
import Layout from './components/Layout/Layout';
import { useTheme } from './hooks/useTheme';
import DesktopOnlyMessage from './components/DesktopOnlyMessage/DesktopOnlyMessage';
import { useEffect, useState } from 'react';

function App() {
  const { isDark, setIsDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile) {
    return <DesktopOnlyMessage />;
  }

  return (
    <>
      <ThemeContext.Provider value={isDark}>
        <Router basename="/">
          <TaskCategoryProvider>
            <TaskProvider>
              <StickyWallProvider>
                <Routes>
                  <Route
                    element={<Layout isDark={isDark} setIsDark={setIsDark} />}
                  >
                    <Route path="/" element={<Home />} />
                    <Route path="/tasks/upcoming" element={<Upcoming />} />
                    <Route path="/tasks/today" element={<Today />} />
                    <Route path="/tasks/stickywall" element={<StickyWall />} />
                    <Route path="/lists/:categoryUrl" element={<List />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                  </Route>
                </Routes>
              </StickyWallProvider>
            </TaskProvider>
          </TaskCategoryProvider>
        </Router>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
