import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu/Menu';
import SplitScreen from '../SplitScreen';
import Card from '../Card';

interface LayoutProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

function Layout({ isDark, setIsDark }: LayoutProps) {
  return (
    <>
      <Header handleThemeChange={setIsDark} isDark={isDark} />
      <SplitScreen size={25}>
        <Card
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Menu />
        </Card>
        <Card
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              paddingTop: '1rem',
            }}
          >
            <Outlet />
          </div>
        </Card>
      </SplitScreen>
    </>
  );
}

export default Layout;
