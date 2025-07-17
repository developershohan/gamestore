import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { memeberLink, cartLink } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<div className="inner-header">
				<InnerBlocks.Content />
				<div className="right-section">
					<div className="header-search"></div>
					<div className="header-mode-switcher"></div>

					{cartLink && (
						<div className="header-cart-link">
							<a href={cartLink}></a>
						</div>
					)}
					{memeberLink && (
						<div className="header-member-link">
							<a href={memeberLink}>Member Area</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
