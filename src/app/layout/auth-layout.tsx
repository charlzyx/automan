import { Suspense } from "react";

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<Suspense fallback={undefined}>
			<div>
				<Outlet />
			</div>
		</Suspense>
	);
};

export default AuthLayout;
