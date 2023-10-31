import { useLocation } from "react-router-dom";

export const useCVPDFStyles = () => {
    const { pathname } = useLocation()
    const isPdf = pathname.includes('/cv-generator')
    
    const getSVGSize = (viewportWidth, withPx = false) => {
        let value;
        if (isPdf) {
            if (viewportWidth < 640) {
                value = withPx ? "14px" : 14 
                return value;
            }
            if (viewportWidth < 768) {
                value = withPx ? "18px" : 18
                return value
            }
            value = withPx ? "18px" : 18
        }
		if (viewportWidth < 640) {
			value = withPx ? 20 : "20px"
            return value
		}
		if (viewportWidth < 768) {
			value = withPx ? 24 : "24px"
            return value
		}
		value = withPx ? 30 : "30px"
        return value
	}

    return {
        getSVGSize,
    }
}