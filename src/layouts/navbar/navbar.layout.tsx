import { FaGithub } from 'react-icons/fa6'

export interface PageLink {
	name: string
	to: string
}

export function NavbarLayout(): JSX.Element {
	return (
		<nav className="flex items-center justify-between px-4 py-2 bg-[#212121] shadow mb-5">
			<div className="flex items-center gap-1">
				<h1 className="text-2xl font-bold text-blue-400 font-[balooTamma] tracking-wide">
					Widgetify
				</h1>
				<p className="text-xs text-blue-200 font-[balooTamma] mt-1">v0</p>
			</div>
			<div>
				<a
					href="https://github.com/widgetify-app/widgetify-pwa"
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className="hover:bg-[#333] p-2 rounded-md cursor-pointer">
						<FaGithub className="text-2xl text-gray-500" />
					</div>
				</a>
			</div>
		</nav>
	)
}
