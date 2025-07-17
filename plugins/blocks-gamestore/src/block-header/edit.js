import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { memeberLink, cartLink } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title="Header Links">
					<TextControl
						label="Memeber Link"
						value={memeberLink}
						onChange={(value) => setAttributes({ memeberLink: value })}
					/>
					<TextControl
						label="Cart Link"
						value={cartLink}
						onChange={(value) => setAttributes({ cartLink: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<div className="inner-header">
					<InnerBlocks />
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
		</>
	);
}
