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
	TextControl,
	TextareaControl,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { title, description, bgImage } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
					<TextControl
						label="Text Field"
						help="Additional help text"
						value={title}
						onChange={(title) => setAttributes({ title })}
					/>
					<TextareaControl
						label="Text"
						help="Enter some text"
						value={description}
						onChange={(description) => setAttributes(description)}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ bgImage: media.url })}
							value={bgImage}
							render={({ open }) => (
								<Button className="is-secondary" onClick={open}>Open Media Library</Button>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<RichText
					tagName="h1"
					className="hero-title"
					value={title}
					onChange={(title) => setAttributes({ title })}
					placeholder="Enter title"
				/>
				<RichText
					tagName="p"
					value={description}
					onChange={(description) => setAttributes({ description })}
					placeholder={__("Heading...")}
				/>

				<img src={bgImage} alt="" />
			</div>
		</>
	);
}
