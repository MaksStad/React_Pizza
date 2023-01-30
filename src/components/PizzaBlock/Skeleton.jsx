import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={465}
		viewBox="0 0 280 465"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="137" cy="128" r="120" />
		<rect x="-1" y="261" rx="10" ry="10" width="280" height="27" />
		<rect x="3" y="419" rx="10" ry="10" width="60" height="30" />
		<rect x="-3" y="309" rx="10" ry="10" width="280" height="88" />
		<rect x="115" y="413" rx="25" ry="25" width="155" height="45" />
	</ContentLoader>
)

export default Skeleton