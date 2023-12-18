import { useEffect } from "react";

export const LoginPage = () => {
    
    useEffect(() => {
		const script = document.createElement('script');
	
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
	
		document.body.appendChild(script);
	
		return () => {
		  document.body.removeChild(script);
		}
	}, []);
    
    return (
        <div>
            Login / Sign up
            <div className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="filled_black"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left">
            </div>
        </div>
        
    )
}