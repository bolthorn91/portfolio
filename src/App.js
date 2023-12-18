import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import UseScrollToTop from './hooks/useScrollToTop';
import { SingleProjectProvider } from './context/SingleProjectContext';
import { inject } from '@vercel/analytics';
import CVPage from 'pages/CV';
import { MainLayout } from 'layouts/MainLayout';
import CVSelectorPage from 'pages/CVSelector';
import { LoginPage } from 'pages/Login';
import { MainComponent } from 'components/shared/MainComponent';



const About = lazy(() => import('./pages/AboutMe'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectSingle = lazy(() => import('./pages/ProjectSingle.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));


function App() {
	inject();

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
		<>
			<AnimatePresence>
				<div className=" bg-secondary-light dark:bg-primary-dark transition duration-300">
					<Router>
						<Suspense fallback={""}>
							<MainComponent>
								<Routes>
									<Route path="/" element={<MainLayout><Home /></MainLayout>} />
									<Route path="projects" element={<MainLayout><Projects /></MainLayout>} />
									<Route
										path="projects/single-project/:id"
										parans
										element={(
											<MainLayout>
												<SingleProjectProvider>
													<ProjectSingle />
												</SingleProjectProvider>
											</MainLayout>
										)}
									/>

									<Route path="about" element={<MainLayout><About /></MainLayout>} />
									<Route path="contact" element={<MainLayout><Contact /></MainLayout>} />
									<Route path="services" element={<MainLayout><Services /></MainLayout>} />
									<Route path="cv" element={<MainLayout><CVSelectorPage /></MainLayout>} />
									<Route path='cv/:id' element={<MainLayout><CVPage/></MainLayout>} />
									<Route path='cv-generator/:id' element={<CVPage/>} />
									<Route path='login' element={<LoginPage/>} />
								</Routes>
							</MainComponent>
						</Suspense>
					</Router>
					<UseScrollToTop />
					<div id="g_id_onload"
						data-client_id={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
						data-context="signin"
						data-ux_mode="popup"
						data-login_uri={`${process.env.REACT_APP_NGROK_BACK_URI}/auth/google`}
						data-itp_support="true">
					</div>
				</div>
			</AnimatePresence>
		</>
	);
}

export default App;
