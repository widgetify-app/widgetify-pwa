export interface PageLink {
	name: string
	to: string
}

export function NavbarLayout(): JSX.Element {
	return (
		<nav className="flex items-center justify-between px-4 py-2 bg-[#212121] shadow mb-5">
			<div className="flex items-center">
				<h1 className="text-2xl font-bold text-gray-300">Widgetify 🪙</h1>
			</div>
		</nav>
	)
}
