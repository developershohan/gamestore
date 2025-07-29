import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaPlaceholder,
} from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
	ToggleControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import "./editor.scss";

const SlideItem = ({ index, slide, onImageChange, onRemove }) => {
	return (
		<>
			<div className="slide-item">
				<p>Light Version Logo</p>
				{slide.lightImage && (
					<div className="image-box">
						<img src={slide.lightImage} alt="Slide image" />
					</div>
				)}
				<MediaPlaceholder
					icon="format-image"
					onSelect={(media) => onImageChange(media.url, index, "lightImage")}
					onSelectURL={(url) => onImageChange(url, index, "lightImage")}
					labels={{
						title: "Slide Light Image",
						instructions: "Upload an image for the slide.",
					}}
					accept="image/*"
					allowedTypes={["image"]}
					multiple={false}
				/>
				<p>Dark Version Logo</p>
				{slide.darkImage && (
					<div className="image-box">
						<img src={slide.darkImage} alt="Slide image" />
					</div>
				)}
				<MediaPlaceholder
					icon="format-image"
					labels={{
						title: "Slide Dark Image",
						instructions: "Upload an image for the slide.",
					}}
					onSelect={(media) => onImageChange(media.url, index, "darkImage")}
					onSelectURL={(url) => onImageChange(url, index, "darkImage")}
					allowedTypes={["image"]}
					multiple={false}
				></MediaPlaceholder>
				{/* <p onClick={removeSlide}>remove</p> */}
				<Button
					isDestructive
					isSecondary
					onClick={onRemove}
					style={{ marginTop: "10px", marginLeft: "5px" }}
				>
					Remove Video
				</Button>
			</div>
		</>
	);
};

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		description,
		link,
		linkAnchor,
		image,
		isVideo,
		video,
		slides: initialSlides,
	} = attributes;
	const [isVideoUpload, setIsVideoUpload] = useState(isVideo);
	const [slides, setSlides] = useState(initialSlides || []);

	const onSlideChange = (updatedSlide, index) => {
		const updatedSlides = [...slides];
		updatedSlides[index] = updatedSlide;
		setSlides(updatedSlides);
		setAttributes({ slides: updatedSlides });
	};

	const addSlide = () => {
		const newSlide = { lightImage: "", darkImage: "" };
		const updateSlides = [...slides, newSlide];
		setSlides(updateSlides);
		setAttributes({ slides: updateSlides });
	};

	const removeSlide = (index) => {
		const updatedSlides = [...slides];
		updatedSlides.splice(index, 1);
		setSlides(updatedSlides);
		setAttributes({ slides: updatedSlides });
	};

	const handleImageChange = (url, index, imageType) => {
		const updatedSlide = { ...slides[index], [imageType]: url };
		onSlideChange(updatedSlide, index);
	};
	return (
		<>
			<InspectorControls>
				<PanelBody title="Hero Settings">
					<TextControl
						label="Title"
						value={title}
						onChange={(title) => setAttributes({ title })}
					/>
					<TextareaControl
						label="Description"
						value={description}
						onChange={(description) => setAttributes({ description })}
					/>
					<TextControl
						label="Button URL"
						value={link}
						onChange={(link) => setAttributes({ link })}
					/>
					<TextControl
						label="Button Anchor"
						value={linkAnchor}
						onChange={(linkAnchor) => setAttributes({ linkAnchor })}
					/>

					<ToggleControl
						label="Is Video"
						checked={isVideoUpload}
						onChange={(value) => {
							setIsVideoUpload(value);
							setAttributes({ isVideo: value, video:"",image:"" });
						}}
					/>
					{isVideoUpload
						? video && (
								<video controls width="100%">
									<source src={video} type="video/mp4" />
								</video>
						  )
						: image && (
								<img src={image} alt="Hero Image" style={{ width: "100%" }} />
						  )}

					<MediaUpload
						onSelect={(media) => {
							if (isVideoUpload) {
								setAttributes({ video: media.url });
							} else {
								setAttributes({ image: media.url });
							}
						}}
						allowedTypes={isVideoUpload ? "video/*" : "image/*"}
						render={({ open }) => (
							<Button onClick={open} className="is-secondary">
								{isVideoUpload ? "Upload video" : "Upload image"}
							</Button>
						)}
					/>
				</PanelBody>
				<PanelBody title="Hero Slider">
					{slides.map((slide, index) => (
						<SlideItem
							key={index}
							index={index}
							slide={slide}
							onImageChange={handleImageChange}
							onRemove={removeSlide}
						/>
					))}
					<Button className="components-button is-primary" onClick={addSlide}>
						Add Slide
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				{video && (
					<video
						className="video-bg"
						loop="loop"
						autoplay=""
						muted
						playsinline
						width="100%"
						height="100%"
					>
						<source className="source-element" src={video} type="video/mp4" />
					</video>
				)}
				{image && <img className="image-bg" src={image} alt="Background" />}

				<div className="hero-mask"></div>
				<div className="hero-content">
					<RichText
						tagName="h1"
						className="hero-title"
						value={title}
						onChange={(title) => setAttributes({ title })}
						placeholder="Enter title"
					/>
					<RichText
						tagName="p"
						className="hero-description"
						value={description}
						onChange={(description) => setAttributes({ description })}
						placeholder="Enter description"
					/>
					<a href={link} className="hero-button shadow">
						{linkAnchor || "Learn More"}
					</a>
				</div>
			</div>
		</>
	);
}
