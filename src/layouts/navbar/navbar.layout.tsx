import { FaGithub } from 'react-icons/fa6'

export interface PageLink {
	name: string
	to: string
}

export function NavbarLayout(): JSX.Element {
	return (
		<nav className="flex items-center justify-between px-4 py-2 mb-5 shadow-sm">
			<div className="flex items-center gap-1 ">
				<h1 className="text-3xl  text-blue-400 font-[balooTamma] tracking-wide font-extrabold">
					Widgetify
				</h1>
				<p className="text-xs text-blue-400 font-[balooTamma] mt-1">v0</p>
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
