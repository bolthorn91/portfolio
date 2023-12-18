import { useAuthContext } from 'context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
	const { setAuthUser, setIsTokenValid } = useAuthContext();
	const navigate = useNavigate();
	const redirectToken = new URLSearchParams(document.location.search).get('token');

	useEffect(() => {
		const checkRedirectToken = async () => {
			if (redirectToken) {
				try {
					const response = await fetch(`${process.env.REACT_APP_NGROK_BACK_URI}/auth/google/profile?${ 
						new URLSearchParams({
							redirectToken})
						}`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${redirectToken}`
						},
					});
					if (response.ok) {
						const {user, googleToken} = await response.json();
						if (!!googleToken && !!user) {
							setAuthUser(() => ({...user}))
							setIsTokenValid(()=> true)
							localStorage.setItem('_token', redirectToken)
						}
						return redirectToken;
					}
				} catch (error) {
					console.log(error)	
				} finally {
					return navigate('/')
				}
			}
			const token = localStorage.getItem('_token')
			if (token) {
				try {
					const response = await fetch(`${process.env.REACT_APP_NGROK_BACK_URI}/auth/validate`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`
						},
					});
					if (response.ok) {
						const {user, googleToken} = await response.json();
						if (user && googleToken) {
							setAuthUser(() => ({...user}))
							setIsTokenValid(()=> true)
						}
					}
				} catch {
					localStorage.removeItem('_token')
					setAuthUser(undefined)
					setIsTokenValid(false)
				}
			}
		}
		checkRedirectToken()
	}, [])
	
};

