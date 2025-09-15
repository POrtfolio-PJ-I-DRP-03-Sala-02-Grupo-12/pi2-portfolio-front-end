import { SignedIn, SignedOut, SignIn, useClerk } from "@clerk/clerk-react";

const Login = () => {

	const { signOut } = useClerk()

	const handleLogout = () => {
		signOut({ redirectUrl: '/' })
		console.log('Logout')
	}


	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gabisou-primary p-8">
			<h1 className="text-2xl text-white mb-4">🔐 Login Page</h1>
			{/*<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"></div>*/}
			<SignedIn>
				<p className="text-stone-300 font-semibold">👋 Hello, admin!</p>
				<div className="px-4 py-2" />
				<button
					className="px-4 py-2 bg-gabisou-red text-stone-100 border-1 border-stone-500 rounded-lg hover:bg-gabisou-dark-red cursor-pointer w-64"
					onClick={handleLogout}
				>
					LOGOUT
				</button>
			</SignedIn>

			<SignedOut>
				<SignIn
					path="/login"
					routing="path"
					afterSignInUrl="/editor" // ✅ after login, go to /editor
				/>
			</SignedOut>
		</div>
	);
};

export default Login;


