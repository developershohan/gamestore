import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { title, description, bgImage } = attributes;

	return (
		<>
			<div {...useBlockProps.save()}>
				<RichText.Content
					tagName="h1"
					value={title}
					placeholder="Enter title"
				/>
				<RichText.Content
					tagName="p"
					value={description}
					placeholder={"Heading..."}
				/>

				<img src={bgImage} alt="" />
			</div>
		</>
	);
}
