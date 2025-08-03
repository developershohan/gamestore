import { __ } from "@wordpress/i18n";

import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";

import "./editor.scss";
import {
	Button,
	PanelBody,
	TextareaControl,
	TextControl,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { title, description, bgImage, shortcode } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title="setting">
					<TextControl
						label="Title"
						value={title}
						onChange={(title) => setAttributes({title})}
					/>
					<TextareaControl
						label="Description"
						value={description}
						onChange={(description) => setAttributes({description})}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({bgImage:media.url})}
							value={bgImage}
							render={({ open }) => (
								<Button className="is-secondary" onClick={open}>
									Open Media Library
								</Button>
							)}
						/>
					</MediaUploadCheck>
					<TextControl
						label="shortcode"
						value={shortcode}
						onChange={(shortcode) => setAttributes(shortcode)}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<div class="subscribe-inner  wrapper">
					<RichText
						tagName="h2"
						className="subsribe-title"
						value={title}
						onChange={(title) => setAttributes({ title })}
					/>
				</div>
			</div>
		</>
	);
}
