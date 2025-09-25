import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl, Spinner } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import "./editor.scss";
import  ServerSideRender  from "@wordpress/server-side-render";

export default function Edit({ attributes, setAttributes }) {
	const { count } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Product Count", "blocks-gamestore")}>
					<TextControl
						label={__("Count", "blocks-gamestore")}
						value={count}
						onChange={(val) => setAttributes({ count: parseInt(val, 10) || 0 })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<ServerSideRender
					block="blocks-gamestore/block-games-line"
					attributes={attributes}
				/>

			</div>
		</>
	);
}
