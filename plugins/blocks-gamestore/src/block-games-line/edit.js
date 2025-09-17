import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl, Spinner } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { count } = attributes;

	// State to hold the products
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch products when count is updated
	useEffect(() => {
		setLoading(true);

		// Fetch products from the custom REST API endpoint
		fetch(`/wp-json/blocks-gamestore/v1/products/?count=${count}`)
			.then((response) => response.json())
			.then((data) => {
				setProducts(data);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}, [count]);

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
				{loading ? (
					<Spinner />
				) : (
					<div className="games-line-container">
						<div class="swiper-wrapper">
							{products.length > 0 ? (
								products.map((product) => (
									<div key={product.id} className="game-item swiper-slide">


										<img src={product.image} alt={product.title} />
										<h3>{product.url}</h3>

									</div>
								))
							) : (
								<p>{__("No products found.", "blocks-gamestore")}</p>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
