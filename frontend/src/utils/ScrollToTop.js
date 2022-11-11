import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function ScrollToTop() {
    const {pathname} = useLocation();
    useEffect(() => {window.scrollTo({top: 0});}, [pathname]);
    return null;
}