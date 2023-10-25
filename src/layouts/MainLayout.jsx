import AppFooter from '../components/shared/AppFooter';
import AppHeader from '../components/shared/AppHeader';
import ScrollToTop from '../components/ScrollToTop';


export const MainLayout = ({children}) => (
    <>
        <ScrollToTop />
        <AppHeader />   
        {children}
        <AppFooter />
    </>
)