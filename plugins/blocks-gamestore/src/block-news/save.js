import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { title, description, bgImage } = attributes;

	return (
		<>
			<div {...useBlockProps.save()}>
				<RichText.Content
					tagName="h2"
					value={title}
					className="title"
					placeholder="Enter title"
				/>
				<RichText.Content
					tagName="p"
					value={description}
					className="description"
					placeholder={"Heading..."}
				/>

				<img src={bgImage} alt="" />
			</div>
		</>
	);
}
