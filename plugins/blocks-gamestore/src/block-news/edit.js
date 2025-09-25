import { __ } from "@wordpress/i18n";

import {
	BlockIcon,
	InspectorControls,
	MediaPlaceholder,
	useBlockProps,
} from "@wordpress/block-editor";

import "./editor.scss";
import {

	PanelBody,
	TextControl,
	TextareaControl,
} from "@wordpress/components";
import ServerSideRender from "@wordpress/server-side-render";

export default function Edit({ attributes, setAttributes }) {
	const { title, description, bgImage } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
					<TextControl
						tagName="h2"
						label="Title"
						value={title}
						className="title"
						onChange={(title) => setAttributes({ title })}
					/>
					<TextareaControl
						tagName="p"
						label="Description"
						value={description}
						className="description"
						onChange={(description) => setAttributes(description)}
					/>

					{bgImage && <img src={bgImage} alt="" />}

					<MediaPlaceholder
						onSelect={(media) => setAttributes({ bgImage: media.url })}
						accept="image/*"
						icon={<BlockIcon icon="format-image" />}
						allowedTypes={["image"]}
						multiple={false}
						labels={{ title: "Background Image" }}
					></MediaPlaceholder>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<ServerSideRender
					block="blocks-gamestore/block-news"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
